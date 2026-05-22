import { useState, useRef, useCallback } from 'react'
import { CloudUpload, FileText, X, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import api from '../lib/api'

// ─── Tipos ──────────────────────────────────────────────────────────
interface UploadFile {
  id: string
  name: string
  size: number
  type: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  progress: number
  raw: File
}

const ALLOWED_EXTS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv']
const MAX_SIZE = 20 * 1024 * 1024  // 20 MB

function getExt(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? ''
}
function fmtSize(bytes: number) {
  return bytes < 1024 * 1024
    ? (bytes / 1024).toFixed(1) + ' KB'
    : (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

// ─── Componente principal ────────────────────────────────────────────
export default function ArchivosPage() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [note, setNote] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((rawFiles: FileList | File[]) => {
    const next: UploadFile[] = []
    Array.from(rawFiles).forEach((f) => {
      const e = getExt(f.name)
      if (!ALLOWED_EXTS.includes(e)) {
        setNote(`Tipo no soportado: .${e}`)
        return
      }
      if (f.size > MAX_SIZE) {
        setNote(`"${f.name}" supera 20 MB`)
        return
      }
      next.push({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        type: e,
        status: 'pending',
        progress: 0,
        raw: f,
      })
    })
    setFiles((prev) => {
      const existing = new Set(prev.map((x) => x.name + x.size))
      return [...prev, ...next.filter((f) => !existing.has(f.name + f.size))]
    })
  }, [])

  const handleUpload = async () => {
    setFiles((prev) => prev.map((f) => ({ ...f, status: 'uploading' })))

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file.raw)
      formData.append('nombre', file.name)

      try {
        const response = await api.post('/archivos/upload', formData)
        if (response.data?.success) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: 'done', progress: 100 } : f
            )
          )
        } else {
          const message = response.data?.message || 'Error al subir archivo'
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: 'error', progress: 0 } : f
            )
          )
          setNote(message)
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || 'Error de conexión al subir archivo'
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: 'error', progress: 0 } : f
          )
        )
        setNote(message)
      }
    }
  }

  const removeFile = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id))

  const doneCnt = files.filter((f) => f.status === 'done').length
  const totalMB = (files.reduce((a, f) => a + f.size, 0) / (1024 * 1024)).toFixed(2)

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-semibold text-slate-100 mb-1">Gestor de Archivos</h1>
      <p className="text-sm text-slate-500 mb-6">Sube documentos a la base de datos del sistema</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Archivos" value={files.length} unit="archivos" />
        <StatCard label="Tamaño total" value={totalMB} unit="MB" />
        <StatCard label="Guardados" value={doneCnt} unit="ok" accent />
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragging
          ? 'border-indigo-500 bg-indigo-950/30'
          : 'border-slate-700 bg-slate-900/50 hover:border-indigo-500/60'}`}
      >
        <CloudUpload className="mx-auto mb-3 text-indigo-400" size={36} />
        <p className="text-sm font-medium text-slate-300">Arrastra tus archivos aquí</p>
        <p className="text-xs text-slate-500 mt-1">PDF · Word · Excel · CSV — máx 20 MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((f) => (
            <FileRow key={f.id} file={f} onRemove={() => removeFile(f.id)} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <button
          disabled={files.length === 0}
          onClick={handleUpload}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Upload size={15} /> Subir a BD
        </button>
        <button
          onClick={() => { setFiles([]); setNote('') }}
          className="text-sm text-slate-400 border border-slate-700 hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors"
        >
          Limpiar
        </button>
        {note && <span className="text-xs text-rose-400 ml-auto">{note}</span>}
      </div>
    </div>
  )
}

function StatCard({ label, value, unit, accent = false }: {
  label: string
  value: number | string
  unit: string
  accent?: boolean
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${accent ? 'text-emerald-400' : 'text-slate-100'}`}>
        {value} <span className="text-xs font-normal text-slate-500">{unit}</span>
      </p>
    </div>
  )
}

function FileRow({ file, onRemove }: { file: UploadFile; onRemove: () => void }) {
  const statusMap = {
    pending:   { icon: <FileText size={14} />,     color: 'text-slate-400',   label: 'Pendiente' },
    uploading: { icon: <Upload size={14} />,       color: 'text-indigo-400',  label: 'Subiendo...' },
    done:      { icon: <CheckCircle size={14} />, color: 'text-emerald-400', label: 'Guardado' },
    error:     { icon: <AlertCircle size={14} />, color: 'text-rose-400',    label: 'Error' },
  }
  const s = statusMap[file.status]
  return (
    <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-200 truncate">{file.name}</p>
        <p className="text-xs text-slate-500">{fmtSize(file.size)}</p>
      </div>
      <span className={`flex items-center gap-1 text-xs font-medium ${s.color}`}>
        {s.icon} {s.label}
      </span>
      <button onClick={onRemove} className="text-slate-500 hover:text-rose-400 transition-colors">
        <X size={14} />
      </button>
    </div>
  )
}
