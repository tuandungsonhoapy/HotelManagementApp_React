import classNames from 'classnames/bind'
import styles from './PaymentInfomation.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import _, { set } from 'lodash'
import { toast } from 'react-toastify'
import http from 'Utils/httpRequest'
import configRoutes from '../../config'

const cx = classNames.bind(styles)

interface customerInfo {
  fullname: string
  email: string
  address: string
  cccd: string
  [key: string]: string
}

const initialCustomerInfo: customerInfo = {
  fullname: '',
  email: '',
  address: '',
  cccd: ''
}

interface errorInputForm {
  fullname: boolean
  email: boolean
  cccd: boolean
  [key: string]: boolean
}

const initialErrorInputForm: errorInputForm = {
  fullname: false,
  email: false,
  cccd: false
}

const PaymentInfomation = () => {
  const location = useLocation()
  const invoiceId = location.state.invoiceId
  const [customerInfo, setCustomerInfo] = useState<customerInfo>(initialCustomerInfo)
  const [checkError, setCheckError] = useState<errorInputForm>(initialErrorInputForm)
  const [count, setCount] = useState<number>(300)
  let price = location.state.totalAmount

  const resultCheckError = useRef(false)
  const paymentStatus = useRef(false)
  const timeUp = useRef(false)

  const navigate = useNavigate()

  //Thực hiện validate register form before call api
  const validateRegisterInfo = () => {
    setCheckError(initialErrorInputForm)
    resultCheckError.current = false
    const arr = ['fullname', 'email', 'cccd']
    let _formError = _.cloneDeep(initialErrorInputForm)
    for (let i = 0; i < arr.length; i++) {
      if (!customerInfo[arr[i]]) {
        _formError[arr[i]] = true
        setCheckError(() => _formError)
        resultCheckError.current = true
      }
    }
    if (resultCheckError.current === true) return false
    return true
  }

  const handleConfirmPayment = () => {
    const check = validateRegisterInfo()
    if (check === false) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    } else {
      const data = { ...customerInfo, invoiceId: invoiceId, price: price }
      console.log('data deposit', data)
      http
        .post('/invoice/pay-deposit', data)
        .then(() => {
          toast.success('Thanh toán thành công')
          paymentStatus.current = true
          navigate(configRoutes.routes.invoiceInfo, { state: { invoiceId } })
        })
        .catch(() => {
          toast.error('Thanh toán thất bại')
        })
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    http.get('invoice/check-invoice', { params: { invoiceId: invoiceId } }).then((res: any) => {
      if (res.code === 1) {
        navigate(configRoutes.routes.invoiceInfo, { state: { invoiceId, note: res.message } })
        paymentStatus.current = true
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId])
  useEffect(() => {
    if (count === 0) {
      timeUp.current = true
      navigate(configRoutes.routes.home)
      let data = location.state.rooms
      http
        .post('booking/unlock-rooms', data)
        .then(() => {
          toast.error('Hủy thanh toán!')
        })
        .catch(() => {
          toast.error('Hủy thanh toán!')
        })
    } else {
      return () => {
        console.log('call api to unlock rooms')
        console.log('count', count)
        if (paymentStatus.current === false && timeUp.current === false) {
          let data = location.state.rooms
          http
            .post('booking/unlock-rooms', data)
            .then(() => {
              toast.error('Hủy thanh toán!')
            })
            .catch(() => {
              toast.error('Hủy thanh toán!')
            })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count === 0])

  return (
    <div className={cx('paymentInfo_container', 'container')}>
      <div className={cx('body_container')}>
        <div className={cx('header_container', 'd-flex')}>
          <h3 className={cx('timer')} style={{ color: 'red' }}>
            {count}
          </h3>
          <h3 className={cx('flex-1')}>Vui lòng điền thông tin của bạn</h3>
        </div>
        <div className={cx('fromInput_container', 'row')}>
          <div className={cx('div-group', 'form-group', 'col-sm-6')}>
            <h6>
              Họ và tên(<span className={cx('require')}>*</span>)
            </h6>
            <input
              placeholder='Họ và tên'
              className={cx('form-control')}
              type='text'
              value={customerInfo.fullname}
              onChange={(e) => setCustomerInfo({ ...customerInfo, fullname: e.target.value })}
            />
          </div>
          <div className={cx('div-group', 'form-group', 'col-sm-6')}>
            <h6>
              Email(<span className={cx('require')}>*</span>)
            </h6>
            <input
              placeholder='Email'
              className={cx('form-control')}
              type='email'
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
            />
          </div>
          <div className={cx('div-group', 'form-group', 'col-sm-6')}>
            <h6>Địa chỉ</h6>
            <input
              placeholder='Địa chỉ'
              className={cx('form-control')}
              type='text'
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            />
          </div>
          <div className={cx('div-group', 'form-group', 'col-sm-6')}>
            <h6>
              CCCD(<span className={cx('require')}>*</span>)
            </h6>
            <input
              placeholder='CCCD'
              className={cx('form-control')}
              type='text'
              value={customerInfo.cccd}
              onChange={(e) => setCustomerInfo({ ...customerInfo, cccd: e.target.value })}
            />
          </div>
        </div>
        <div className={cx('bankInfo_container')}>
          <h5>Vui lòng thanh toán theo thông tin số tài khoản dưới đây.</h5>
          <div className={cx('bankInfo_box')}>
            <h5 className={cx('bank_info')}>Mã hóa đơn: {invoiceId}</h5>
            <h5 className={cx('bank_info', 'price')}>Số tiền cần thanh toán: {price.toLocaleString('vi-VN')}đ</h5>
            <h5 className={cx('bank_info')}>Momo: 0949825991</h5>
            <h5 className={cx('bank_info')}>STK ngân hàng (Agribank): 4605205228342</h5>
            <h5 className={cx('bank_info', 'account_owner')}>Chủ tài khoản: Lê Anh Tuấn Dũng</h5>
            <h5 className={cx('bank_info')} style={{ color: 'red' }}>
              * Vui lòng điền nội dung giao dịch: TTTDC {'{Mã hóa đơn}'}
            </h5>
          </div>
          <div className={cx('div_btn')}>
            <button onClick={handleConfirmPayment} className={cx('btn', 'btn-primary')}>
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfomation
