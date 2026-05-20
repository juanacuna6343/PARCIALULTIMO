import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Search, Pencil, Trash2, Phone, Mail, Building2, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Button }       from '../components/ui/Button'
import { Badge }        from '../components/ui/Badge'
import { Modal }        from '../components/ui/Modal'
import { Input }        from '../components/ui/Input'
import { Avatar }       from '../components/ui/Avatar'
import { Select }       from '../components/ui/Select'
import { Tabs }         from '../components/ui/Tabs'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { SkeletonTable, SkeletonCard } from '../components/ui/Skeleton'
import { EmptyState }   from '../components/ui/EmptyState'
import { useClientes, useCreateCliente, useUpdateCliente, useDeleteCliente } from '../features/clientes/hooks/useClientes'
import type { Cliente, ClienteFormData } from '../types/cliente.types'

const schema = z.object({
  nombre:   z.string().min(2, 'Mínimo 2 caracteres'),
  email:    z.string().email('Correo inválido'),
  telefono: z.string().min(7, 'Teléfono inválido'),
  empresa:  z.string().optional(),
  estado:   z.enum(['activo', 'inactivo']),
  notas:    z.string().optional(),
})
type FormData = z.infer<typeof schema>

const estadoOptions = [
  { value: 'activo',   label: 'Activo'   },
  { value: 'inactivo', label: 'Inactivo' },
]

const TABS = [
  { id: 'todos',    label: 'Todos'    },
  { id: 'activo',   label: 'Activos'  },
  { id: 'inactivo', label: 'Inactivos' },
]

/* ── Modal de cliente ──────────────────────────────────── */
interface ClienteModalProps {
  open: boolean; onClose: () => void; cliente?: Cliente
}
const ClienteModal = ({ open, onClose, cliente }: ClienteModalProps) => {
  const isEdit = !!cliente
  const { mutate: create, isPending: creating } = useCreateCliente()
  const { mutate: update, isPending: updating } = useUpdateCliente()

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: cliente
        ? { nombre: cliente.nombre, email: cliente.email, telefono: cliente.telefono, empresa: cliente.empresa ?? '', estado: cliente.estado, notas: cliente.notas ?? '' }
        : { estado: 'activo' },
    })

  const onSubmit = (data: FormData) => {
    if (isEdit && cliente) {
      update({ id: cliente.id, data }, { onSuccess: () => { onClose(); reset() } })
    } else {
      create(data as ClienteFormData, { onSuccess: () => { onClose(); reset() } })
    }
  }

  const estado = watch('estado')

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar cliente' : 'Nuevo cliente'}
      size="md"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" isLoading={creating || updating} onClick={handleSubmit(onSubmit)}>
            {isEdit ? 'Guardar cambios' : 'Crear cliente'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('nombre')} id="c-nombre" label="Nombre completo *" placeholder="Juan Pérez" error={errors.nombre?.message} />
          <Input {...register('email')} id="c-email" label="Correo electrónico *" type="email" placeholder="juan@email.com" error={errors.email?.message} leftIcon={<Mail size={13} />} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input {...register('telefono')} id="c-tel" label="Teléfono *" placeholder="310-000-0000" error={errors.telefono?.message} leftIcon={<Phone size={13} />} />
          <Input {...register('empresa')} id="c-emp" label="Empresa" placeholder="Mi Empresa S.A.S." leftIcon={<Building2 size={13} />} />
        </div>
        <Select
          id="c-estado"
          label="Estado *"
          options={estadoOptions}
          value={estado}
          onChange={(v) => setValue('estado', v as 'activo' | 'inactivo')}
          error={errors.estado?.message}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-notas" className="text-xs font-medium text-surface-300">Notas</label>
          <textarea
            {...register('notas')}
            id="c-notas"
            rows={3}
            placeholder="Información adicional..."
            className="w-full rounded-lg bg-surface-800 border border-white/10 text-surface-100 text-sm px-3 py-2 placeholder:text-surface-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function ClientesPage() {
  const { data: clientes = [], isLoading, isError, refetch } = useClientes()
  const { mutate: del, isPending: deleting } = useDeleteCliente()

  const [search,      setSearch]      = useState('')
  const [activeTab,   setActiveTab]   = useState('todos')
  const [modalOpen,   setModalOpen]   = useState(false)
  const [editTarget,  setEditTarget]  = useState<Cliente | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Cliente | undefined>()

  const filtered = clientes.filter((c) => {
    const matchTab = activeTab === 'todos' || c.estado === activeTab
    const q = search.toLowerCase()
    const matchSearch = !q || c.nombre.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.empresa ?? '').toLowerCase().includes(q)
    return matchTab && matchSearch
  })

  const counts = {
    todos:    clientes.length,
    activo:   clientes.filter(c => c.estado === 'activo').length,
    inactivo: clientes.filter(c => c.estado === 'inactivo').length,
  }

  const openCreate = () => { setEditTarget(undefined); setModalOpen(true) }
  const openEdit   = (c: Cliente) => { setEditTarget(c); setModalOpen(true) }

  return (
    <div className="p-6 space-y-5 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Clientes</h1>
          <p className="text-sm text-surface-500 mt-0.5">{clientes.length} clientes registrados</p>
        </div>
        <Button leftIcon={<UserPlus size={14} />} onClick={openCreate}>Nuevo cliente</Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Tabs
          tabs={TABS.map(t => ({ ...t, count: counts[t.id as keyof typeof counts] }))}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="flex-1 min-w-48 max-w-72">
          <Input
            placeholder="Buscar por nombre, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={13} />}
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonTable rows={6} cols={5} />
      ) : isError ? (
        <EmptyState
          icon={<Users size={28} />}
          title="Error al cargar clientes"
          description="No se pudo conectar con el servidor"
          action={<Button size="sm" variant="secondary" onClick={() => refetch()}>Reintentar</Button>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={28} />}
          title={search ? 'Sin resultados' : 'Sin clientes'}
          description={search ? 'Prueba con otro término de búsqueda' : 'Crea tu primer cliente para comenzar'}
          action={!search && <Button size="sm" leftIcon={<UserPlus size={13} />} onClick={openCreate}>Crear primer cliente</Button>}
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-surface-800/40">
                  <th className="text-left px-5 py-3 text-xs font-medium text-surface-500 tracking-wide">CLIENTE</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-surface-500 tracking-wide hidden md:table-cell">EMPRESA</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-surface-500 tracking-wide hidden lg:table-cell">TELÉFONO</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-surface-500 tracking-wide">ESTADO</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-surface-500 tracking-wide">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.nombre} size="sm" />
                        <div>
                          <p className="font-medium text-surface-100">{c.nombre}</p>
                          <p className="text-xs text-surface-500">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-surface-400 hidden md:table-cell">
                      {c.empresa ?? <span className="text-surface-600">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-surface-400 hidden lg:table-cell">{c.telefono}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={c.estado === 'activo' ? 'success' : 'gray'} dot size="sm">
                        {c.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="xs" iconOnly onClick={() => openEdit(c)} aria-label="Editar">
                          <Pencil size={13} />
                        </Button>
                        <Button variant="ghost" size="xs" iconOnly onClick={() => setDeleteTarget(c)} aria-label="Eliminar" className="hover:text-danger">
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
            <p className="text-xs text-surface-500">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </Card>
      )}

      <ClienteModal open={modalOpen} onClose={() => setModalOpen(false)} cliente={editTarget} />

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(undefined)}
        onConfirm={() => {
          if (deleteTarget) del(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) })
        }}
        title="¿Eliminar cliente?"
        message={`Esta acción eliminará permanentemente a "${deleteTarget?.nombre}" y no se puede deshacer.`}
        confirmLabel="Eliminar cliente"
        isLoading={deleting}
      />
    </div>
  )
}
