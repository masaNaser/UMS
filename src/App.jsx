import { RouterProvider } from "react-router-dom"
import router from "./router"
import { QueryClientProvider,QueryClient  } from '@tanstack/react-query'

function App() {
  /**
   * شو هو QueryClient؟
 هو كائن (Object) مسؤول عن:
تخزين الكاش (Cache)
إدارة كل queries
إعادة تحميل البيانات
حذف/تحديث البيانات
التحكم بسلوك React Query بالكامل
   */
const queryClient = new QueryClient()
  return (
      <>
        <QueryClientProvider client={queryClient}>
         <RouterProvider router={router}/>     
        </QueryClientProvider>

      </>
  )
}

export default App
