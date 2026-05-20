import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Pencil, Trash2, UserCog, Shield, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card }       from '../components/ui/Card'
import { Button }     from '../components/ui/Button'
import { Badge }      from '../components/ui/Badge'
import { Modal }      from '../components/ui/Modal'
import { Input }      from '../components/ui/Input'
import { Select }     from '../components/ui/Select'
import { Avatar }     from '../components/ui/Avatar'
import { Tabs }       from '../components/ui/Tabs'
import { ConfirmModal } from '../components/ui/ConfirmModal'
import { SkeletonTable } from '../components/ui/Skeleton'
import { EmptyState }   from '../components/ui/EmptyState'
import { useUsuarios, useCreateUsuario, useUpdateUsuario, useDeleteUsuario } from '../features/usuarios/hooks/useUsuarios'
import type { Usuario, UsuarioFormData, RolUsuario } from '../types/usuario.types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const schema = z.object({
  nombre:   z.string().min(2, 'Nombre requerido'),
  email:    z.string().email('Correo inválido'),
  rol:      z.enum(['admin', 'supervisor', 'usuario']),
  estado:   z.enum(['activo', 'inactivo']),
  password: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
})
type FormData = z.infer<typeof schema>

const rolBadge: Record<RolUsuario, { v: 'danger' | 'warning' | 'info'; icon: React.ReactNode; label: string }> = {
  admin:      { v: 'danger',  icon: <Shield size={11} />,  label: 'Admin'      },
  supervisor: { v: 'warning', icon: <UserCog size={11} />, label: 'Supervisor' },
  usuario:    { v: 'info',    icon: <User size={11} />,    label: 'Usuario'    },
}

const rolOpts    = Object.entries(rolBadge).map(([value, { label }]) => ({ value, label }))
const estadoOpts = [{ value: 'activo', label: 'Activo' }, { value: 'inactivo', label: 'Inactivo' }]

const TABS = [
  { id: 'todos',    label: 'Todos'       },
  { id: 'activo',   label: 'Activos'     },
  { id: 'inactivo', label: 'Inactivos'   },
]

interface UsuarioModalProps { open: boolean; onClose: () => void; usuario?: Usuario }
const UsuarioModal = ({ open, onClose, usuario }: UsuarioModalProps) => {
  const isEdit = !!usuario
  const { mutate: create, isPending: creating } = useCreateUsuario()
  const { mutate: update, isPending: updating } = useUpdateUsuario()
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: usuario
      ? { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, estado: usuario.estado, password: '' }
      : { rol: 'usuario', estado: 'activo' },
  })

  const onSubmit = (data: FormData) => {
    const payload = { ...data, password: data.password || undefined }
    if (isEdit && usuario) update({ id: usuario.id, data: payload }, { onSuccess: () => { onClose(); reset() } })
    else create(payload as UsuarioFormData, { onSuccess: () => { onClose(); reset() } })
  }

  return (
    <Modal
      open={open} onClose={onClose}
      title={isEdit ? 'Editar usuario' : 'Nuevo usuario'}
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button size="sm" isLoading={creating || updating} onClick={handleSubmit(onSubmit)}>
            {isEdit ? 'Guardar' : 'Crear usuario'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input {...register('nombre')} id="u-nombre" label="Nombre completo *" placeholder="Juan Pérez" error={errors.nombre?.message} />
        <Input {...register('email')} id="u-email" label="Correo *" type="email" placeholder="juan@sgdi.local" error={errors.email?.message} />
        <div className="grid grid-cols-2 gap-4">
          <Select id="u-rol" label="Rol *" options={rolOpts} value={watch('rol')} onChange={v => setValue('rol', v as RolUsuario)} />
          <Select id="u-estado" label="Estado *" options={estadoOpts} value={watch('estado')} onChange={v => setValue('estado', v as 'activo' | 'inactivo')} />
        </div>
        <Input
          {...register('password')}
          id="u-pass"
          label={isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña *'}
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          hint={isEdit ? 'Dejar en blanco para no cambiar' : undefined}
        />
      </div>
    </Modal>
  )
}

export default function UsuariosPage() {
  const { data: usuarios = [], isLoading, isError, refetch } = useUsuarios()
  const { mutate: del, isPending: deleting } = useDeleteUsuario()

  const [activeTab,    setActiveTab]    = useState('todos')
  const [modalOpen,    setModalOpen]    = useState(false)
  const [editTarget,   setEditTarget]   = useState<Usuario | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Usuario | undefined>()

  const filtered = usuarios.filter(u => activeTab === 'todos' || u.estado === activeTab)
  const counts   = {
    todos:    usuarios.length,
    activo:   usuarios.filter(u => u.estado === 'activo').length,
    inactivo: usuarios.filter(u => u.estado === 'inactivo').length,
  }

  return (
    <div className="p-6 space-y-5 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-surface-100">Usuarios</h1>
          <p className="text-sm text-surface-500 mt-0.5">{usuarios.length} usuarios del sistema</p>
        </div>
        <Button leftIcon={<UserPlus size={14} />} onClick={() => { setEditTarget(undefined); setModalOpen(true) }}>
          Nuevo usuario
        </Button>
      </div>

      <Tabs tabs={TABS.map(t => ({ ...t, count: counts[t.id as keyof typeof counts] }))} activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
        <SkeletonTable rows={4} cols={5} />
      ) : isError ? (
        <EmptyState icon={<UserCog size={28} />} title="Error al cargar" description="No se pudo conectar con el servidor" action={<Button size="sm" variant="secondary" onClick={() => refetch()}>Reintentar</Button>} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<UserCog size={28} />} title="Sin usuarios" description="Crea el primer usuario del sistema" action={<Button size="sm" leftIcon={<UserPlus size={13} />} onClick={() => setModalOpen(true)}>Crear usuario</Button>} />
      ) : (
        <Card padding="none">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-surface-800/40">
                <th className="text-left px-5 py-3 text-xs font-medium text-surface-500">USUARIO</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-surface-500 hidden md:table-cell">ROL</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-surface-500">ESTADO</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-surface-500 hidden lg:table-cell">CREADO</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-surface-500">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((u, i) => {
                const rb = rolBadge[u.rol]
                return (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.nombre} size="sm" />
                        <div>
                          <p className="font-medium text-surface-100">{u.nombre}</p>
                          <p className="text-xs text-surface-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <Badge variant={rb.v} size="sm">
                        <span className="flex items-center gap-1">{rb.icon}{rb.label}</span>
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={u.estado === 'activo' ? 'success' : 'gray'} dot size="sm">
                        {u.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-surface-500 hidden lg:table-cell">
                      {format(new Date(u.createdAt), "d MMM yyyy", { locale: es })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="xs" iconOnly onClick={() => { setEditTarget(u); setModalOpen(true) }}>
                          <Pencil size={13} />
                        </Button>
                        <Button variant="ghost" size="xs" iconOnly onClick={() => setDeleteTarget(u)} className="hover:text-danger">
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}

      <UsuarioModal open={modalOpen} onClose={() => setModalOpen(false)} usuario={editTarget} />
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(undefined)}
        onConfirm={() => { if (deleteTarget) del(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) }) }}
        title="¿Eliminar usuario?"
        message={`Se eliminará "${deleteTarget?.nombre}" del sistema.`}
        confirmLabel="Eliminar usuario"
        isLoading={deleting}
      />
    </div>
  )
}
