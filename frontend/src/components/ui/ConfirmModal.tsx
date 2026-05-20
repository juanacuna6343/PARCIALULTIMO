import { AlertTriangle } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'

interface ConfirmModalProps {
  open:      boolean
  onClose:   () => void
  onConfirm: () => void
  title:     string
  message:   string
  confirmLabel?: string
  isLoading?:    boolean
}

export const ConfirmModal = ({
  open, onClose, onConfirm, title, message, confirmLabel = 'Confirmar', isLoading,
}: ConfirmModalProps) => (
  <Modal
    open={open}
    onClose={onClose}
    size="sm"
    footer={
      <>
        <Button variant="secondary" size="sm" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button variant="danger" size="sm" onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </>
    }
  >
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center flex-shrink-0">
        <AlertTriangle size={18} className="text-danger" />
      </div>
      <div className="space-y-1">
        <p className="font-display font-semibold text-surface-100 text-sm">{title}</p>
        <p className="text-xs text-surface-400 leading-relaxed">{message}</p>
      </div>
    </div>
  </Modal>
)
