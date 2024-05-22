import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import AdminRoutes from './AdminRoutes'

const AppRoutes = () => {
  return (
    <>
      <PrivateRoutes />
      <PublicRoutes />
      <AdminRoutes />
    </>
  )
}

export default AppRoutes
