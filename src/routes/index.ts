//Pages
import Blog from 'pages/blog'
import Login from 'pages/Login/Login'
import HomePage from 'pages/Home'
import Register from 'pages/Register'
import DefaultLayout from 'layouts/DefaultLayout'

//Layouts

//routesConfig
import config from '../config'

const publicRoutes = [
  { path: config.routes.blog, component: Blog, layout: DefaultLayout },
  { path: config.routes.login, component: Login },
  { path: config.routes.home, component: HomePage, layout: DefaultLayout },
  { path: config.routes.register, component: Register }
]

export { publicRoutes }
