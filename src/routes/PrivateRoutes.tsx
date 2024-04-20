//Pages
import UserManagementPage from 'pages/UserManagement'
import RoleManagement from 'pages/RoleManagement'

//Layouts
import DefaultLayout from 'layouts/DefaultLayout'
import { DefaultLayoutProps } from 'interfaces/layout.interface'

//routesConfig
import config from '../config'
import { Fragment } from 'react/jsx-runtime'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

interface privateRoute {
  path: string
  component: () => JSX.Element
  layout?: ({ children }: DefaultLayoutProps) => JSX.Element
}

type typePrivateRoutes = privateRoute[]

const privateRoutes: typePrivateRoutes = [
  { path: config.routes.user, component: UserManagementPage, layout: DefaultLayout },
  { path: config.routes.role, component: RoleManagement, layout: DefaultLayout }
]

const PrivateRoutes = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const CheckPrivateRoute = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
      if (currentUser.isAuthenticated === false) {
        navigate(-1)
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
