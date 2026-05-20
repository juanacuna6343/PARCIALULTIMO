import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Zap } from 'lucide-react'
import { Input }  from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useLogin } from '../features/auth/hooks/useLogin'

const schema = z.object({
  email:    z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { mutate, isPending } = useLogin()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@sgdi.local', password: 'Admin123!' },
  })

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-brand-500 via-violet-500 to-brand-600" />

      <div className="p-8">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg leading-none">SGDI</h1>
            <p className="text-[10px] text-surface-500 font-medium tracking-widest uppercase">Sistema de Gestión Digital</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-display font-semibold text-surface-100 text-xl mb-1">Bienvenido de nuevo</h2>
          <p className="text-sm text-surface-500">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
          <Input
            {...register('email')}
            id="login-email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@correo.com"
            error={errors.email?.message}
            leftIcon={<Mail size={14} />}
            autoComplete="email"
          />
          <Input
            {...register('password')}
            id="login-password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            leftIcon={<Lock size={14} />}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isPending}
            size="lg"
            className="mt-6"
          >
            {isPending ? 'Ingresando...' : 'Ingresar al sistema'}
          </Button>
        </form>

        <p className="text-center text-xs text-surface-600 mt-6">
          Demo: <span className="text-surface-400 font-mono">admin@sgdi.local</span> / <span className="text-surface-400 font-mono">Admin123!</span>
        </p>
      </div>
    </div>
  )
}
