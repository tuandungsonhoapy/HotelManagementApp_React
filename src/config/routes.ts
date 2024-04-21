interface Routes {
  blog: string
  login: string
  home: string
  register: string
  logout: string
  settings: string
  viewprofile: string
  user: string
  timMua: string
  timThue: string
  giaNhaDat: string
  hoiDap: string
  moiGioi: string
  duAn: string
  forgotPassword: string
  danhMucPhong: string
  role: string
  customerinformation: string
  paymentinformation: string
}

const routes: Routes = {
  blog: '/blog',
  login: '/login',
  home: '/',
  register: '/register',
  logout: '/logout',
  settings: '/settings',
  viewprofile: '/viewprofile',
  user: '/user',
  timMua: '/tim-mua',
  timThue: '/tim-thue',
  giaNhaDat: '/gia-nha-dat',
  hoiDap: '/hoi-dap',
  moiGioi: 'moi-gioi',
  duAn: '/du-an',
  forgotPassword: '/forgot-password',
  danhMucPhong: '/danh-muc-phong',
  role: '/role',
  customerinformation: '/customer-information',
  paymentinformation: '/payment-information'
}

export default routes
