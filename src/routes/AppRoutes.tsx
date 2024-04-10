import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const AppRoutes = () => {
  return (
    <>
      <PrivateRoutes />
      <PublicRoutes />
    </>
  )
}

export default AppRoutes
