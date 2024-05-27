//Pages
import UserManagementPage from 'pages/UserManagement'
import RoleManagement from 'pages/RoleManagement'
import RoomManagement from 'pages/RoomManagement'
import RoomCategory from 'pages/RoomCategory'
import GroupRole from 'pages/GroupRole'
import InvoiceManagement from 'pages/InvoiceManagement'
import InvoiceInfoAdmin from 'pages/InvoiceInfoAdmin'
import ServiceManagement from 'pages/ServiceManagement'

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
  { path: config.routes.user, component: UserManagementPage, layout: AdminLayout },
  { path: config.routes.role, component: RoleManagement, layout: AdminLayout },
  { path: config.routes.roomManagement, component: RoomManagement, layout: AdminLayout },
  { path: config.routes.roomCategory, component: RoomCategory, layout: AdminLayout },
  { path: config.routes.groupRole, component: GroupRole, layout: AdminLayout },
  { path: config.routes.invoiceManagement, component: InvoiceManagement, layout: AdminLayout },
  { path: config.routes.invoiceInfoAdmin, component: InvoiceInfoAdmin, layout: AdminLayout },
  { path: config.routes.serviceManagement, component: ServiceManagement, layout: AdminLayout }
]

const AdminRoutes = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const CheckPrivateRoute = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      if (currentUser.isAuthenticated === false) {
        navigate(-1)
        toast.error('Bạn cần đăng nhập để truy cập trang này')
      }
      if (currentUser.groupWithRoles.id === 1) {
        navigate(-1)
        toast.error('Bạn không có quyền truy cập trang này')
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

export default AdminRoutes
