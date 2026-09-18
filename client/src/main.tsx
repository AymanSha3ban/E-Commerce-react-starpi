import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'
import {Provider} from './components/ui/provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const ProductClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={ProductClient}>
    <Provider>
      <RouterProvider router={router} />
   </Provider>
  </QueryClientProvider>
)