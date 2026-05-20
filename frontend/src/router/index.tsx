import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout }  from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { AuthGuard, GuestGuard } from './AuthGuard'
import { Skeleton }   from '../components/ui/Skeleton'

const LoginPage       = lazy(() => import('../pages/LoginPage'))
const DashboardPage   = lazy(() => import('../pages/DashboardPage'))
const ClientesPage    = lazy(() => import('../pages/ClientesPage'))
const ServiciosPage   = lazy(() => import('../pages/ServiciosPage'))
const SuscripcionesPage = lazy(() => import('../pages/SuscripcionesPage'))
const EventosPage     = lazy(() => import('../pages/EventosPage'))
const PipelinePage    = lazy(() => import('../pages/PipelinePage'))
const CalendarioPage  = lazy(() => import('../pages/CalendarioPage'))
const ArchivosPage    = lazy(() => import('../pages/ArchivosPage'))
const UsuariosPage    = lazy(() => import('../pages/UsuariosPage'))
const NotFoundPage    = lazy(() => import('../pages/NotFoundPage'))

const PageFallback = () => (
  <div className="p-6 space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-4 w-96" />
    <div className="grid grid-cols-4 gap-4 mt-6">
      {[0,1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
    </div>
  </div>
)

export const AppRouter = () => (
  <Suspense fallback={<PageFallback />}>
    <Routes>
      {/* Guest routes */}
      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout><LoginPage /></AuthLayout>} path="/login" />
      </Route>

      {/* Protected routes */}
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard"     element={<DashboardPage />}     />
          <Route path="/clientes"      element={<ClientesPage />}      />
          <Route path="/servicios"     element={<ServiciosPage />}     />
          <Route path="/suscripciones" element={<SuscripcionesPage />} />
          <Route path="/eventos"       element={<EventosPage />}       />
          <Route path="/pipeline"      element={<PipelinePage />}      />
          <Route path="/calendario"    element={<CalendarioPage />}    />
          <Route path="/archivos"      element={<ArchivosPage />}      />
          <Route path="/usuarios"      element={<UsuariosPage />}      />
        </Route>
      </Route>

      {/* Redirects */}
      <Route path="/"   element={<Navigate to="/dashboard" replace />} />
      <Route path="*"   element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)
