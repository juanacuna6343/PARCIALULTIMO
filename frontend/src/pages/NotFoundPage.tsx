import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* 404 big number */}
        <div className="relative mb-6">
          <p className="font-display font-black text-[9rem] leading-none text-surface-800 select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <AlertTriangle size={36} className="text-amber-400" />
            </div>
          </div>
        </div>

        <h1 className="font-display font-bold text-2xl text-surface-100 mb-2">Página no encontrada</h1>
        <p className="text-surface-400 text-sm mb-8">
          La ruta que intentas acceder no existe o fue movida. Verifica la URL o regresa al inicio.
        </p>

        <Button leftIcon={<Home size={14} />} onClick={() => navigate('/dashboard')}>
          Volver al Dashboard
        </Button>
      </motion.div>
    </div>
  )
}
