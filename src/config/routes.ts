interface Routes {
  blog: string
  login: string
  home: string
  register: string
  logout: string
  settings: string
  viewprofile: string
  productDetail: string
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
  roomManagement: string
  roomCategory: string
  groupRole: string
  booking: string
  paymentInvoice: string
  invoiceInfo: string
  invoiceManagement: string
  invoiceInfoAdmin: string
  serviceManagement: string
  services: string
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
  productDetail: '/product-detail',
  timThue: '/tim-thue',
  giaNhaDat: '/gia-nha-dat',
  hoiDap: '/hoi-dap',
  moiGioi: 'moi-gioi',
  duAn: '/du-an',
  forgotPassword: '/forgot-password',
  danhMucPhong: '/danh-muc-phong',
  role: '/role',
  customerinformation: '/customer-information',
  paymentinformation: '/payment-information',
  roomManagement: '/room-management',
  roomCategory: '/room-category',
  groupRole: '/group-role',
  booking: '/booking',
  paymentInvoice: '/payment-invoice',
  invoiceInfo: '/invoice-info',
  invoiceManagement: '/invoice-management',
  invoiceInfoAdmin: '/invoice-info-admin',
  serviceManagement: '/service-management',
  services: '/services'
}

export default routes
