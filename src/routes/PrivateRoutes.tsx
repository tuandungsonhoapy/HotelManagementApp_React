//Pages
import Booking from 'pages/Booking'
import Invoice from 'pages/Invoice'
import InvoiceInfo from 'pages/InvoiceInfo'
import PaymentInformation from 'pages/PaymentInformation'

//Layouts
import { DefaultLayoutProps } from 'interfaces/layout.interface'
import AdminLayout from 'layouts/AdminLayout'
import DefaultLayout from 'layouts/DefaultLayout'

//routesConfig
import config from '../config'
import { Fragment } from 'react/jsx-runtime'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

interface privateRoute {
  path: string
  component: (props: any) => JSX.Element
  layout?: ({ children }: DefaultLayoutProps) => JSX.Element
}

type typePrivateRoutes = privateRoute[]

const privateRoutes: typePrivateRoutes = [
  { path: config.routes.booking, component: Booking, layout: DefaultLayout },
  { path: config.routes.paymentInvoice, component: Invoice, layout: DefaultLayout },
  { path: config.routes.paymentinformation, component: PaymentInformation, layout: DefaultLayout },
  { path: config.routes.invoiceInfo, component: InvoiceInfo, layout: DefaultLayout }
]

const PrivateRoutes = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const CheckPrivateRoute = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      if (currentUser.isAuthenticated === false) {
        navigate(-1)
        toast.error('Bạn cần đăng nhập để truy cập trang này')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <>{children}</>
  }

  return (
    <Routes>
      {privateRoutes.map((route, index) => {
        const Page = route.component
        let Layout: any = Fragment
        if (route.layout) {
          Layout = route.layout
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <CheckPrivateRoute>
                <Layout>
                  <Page />
                </Layout>
              </CheckPrivateRoute>
            }
          />
        )
      })}
    </Routes>
  )
}

export default PrivateRoutes
