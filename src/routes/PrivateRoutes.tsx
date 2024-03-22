//Pages
import UserManagementPage from 'pages/UserManagement'

//Layouts

//routesConfig
import config from '../config'
import { Fragment } from 'react/jsx-runtime'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { DefaultLayoutProps } from 'interfaces/layout.interface'

interface privateRoute {
  path: string
  component: () => JSX.Element
  layout?: ({ children }: DefaultLayoutProps) => JSX.Element
}

type typePrivateRoutes = privateRoute[]

const privateRoutes: typePrivateRoutes = [{ path: config.routes.user, component: UserManagementPage }]

const PrivateRoutes = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const CheckPrivateRoute = ({ children }: { children: React.ReactNode }) => {
    useLayoutEffect(() => {
      if (currentUser.isAuthenticated === false) {
        navigate(config.routes.login)
      }
    })
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
