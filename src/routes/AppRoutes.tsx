import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const AppRoutes = () => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Call app routes!')
  return (
    <>
      <PrivateRoutes />
      <PublicRoutes />
    </>
  )
}

export default AppRoutes
