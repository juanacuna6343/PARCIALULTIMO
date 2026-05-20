import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from './lib/queryClient'
import { AppRouter }   from './router'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <Toaster
          richColors
          position="top-right"
          duration={3500}
          toastOptions={{
            style: {
              background: '#1E293B',
              border:     '1px solid rgba(255,255,255,0.08)',
              color:      '#F1F5F9',
              fontSize:   '13px',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
