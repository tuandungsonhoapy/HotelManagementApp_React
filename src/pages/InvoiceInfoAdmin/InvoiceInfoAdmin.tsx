import classNames from 'classnames/bind'
import styles from './InvoiceInfoAdmin.module.scss'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

interface interfaceInvoice {
  id: number
  note: string
  status: number
  totalAmount: number
  payments: number
  createdAt: string
}

const initialInvoice: interfaceInvoice = {
  id: 0,
  note: '',
  status: -2,
  totalAmount: 0,
  payments: 0,
  createdAt: ''
}

interface interfaceBooking {
  checkIn: string
  checkOut: string
  price: number
}

interface interfaceRoom {
  id: number
  roomNumber: string
  price: number
  Booking: interfaceBooking
}

const InvoiceInfoAdmin = () => {
  const location = useLocation()
  const invoiceId = location.state.invoiceId
  const [invoice, setInvoice] = useState<interfaceInvoice>(initialInvoice)
  const [rooms, setRooms] = useState<interfaceRoom[]>([])

  const navigate = useNavigate()

  const totalAmount = rooms.reduce((total, room) => total + room.Booking.price, 0)

  const renderBookings = () => {
    return rooms.map((room, index) => {
      const checkInDate = new Date(room.Booking.checkIn)
      const formatted_checkIn = `${checkInDate.toLocaleDateString()} ${checkInDate.toLocaleTimeString()}`
      const checkOutDate = new Date(room.Booking.checkOut)
      const formatted_checkOut = `${checkOutDate.toLocaleDateString()} ${checkOutDate.toLocaleTimeString()}`
      return (
        <tr key={room.id}>
          <th scope='row'>{index + 1}</th>
          <td>{room.id}</td>
          <td>{room.roomNumber}</td>
          <td>{formatted_checkIn}</td>
          <td>{formatted_checkOut}</td>
          <td>{room.price.toLocaleString('vi-VN')}đ</td>
          <td>{room.Booking.price.toLocaleString('vi-VN')}đ</td>
        </tr>
      )
    })
  }

  const handleConfirmPayment = () => {
    http
      .post('invoice/confirm-pay-deposit', { invoiceId: invoiceId })
      .then((res) => {
        if (res.status === 200) {
          fetchInvoice()
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const handleRejectPayment = () => {
    http
      .put('invoice/reject-pay-deposit', { invoiceId: invoiceId })
      .then((res) => {
        if (res.status === 200) {
          fetchInvoice()
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const fetchInvoice = () => {
    http.get('booking/by-invoice', { params: { invoiceId: invoiceId } }).then((res) => {
      setInvoice(res.data)
      setRooms(res.data.Rooms)
    })
  }

  useEffect(() => {
    fetchInvoice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId])

  return (
    <div className={cx('page_container')}>
      <div className={cx('container')}>
        <div className={cx('header_container')}>
          <h3 className={cx('header_title')}>Thông tin hóa đơn</h3>
        </div>
        <div className={cx('body_container')}>
          <div className={cx('header_body')}>
            <p>Mã hóa đơn: {invoice.id}</p>
            <p>
              Trạng thái:{' '}
              {invoice.status === 0
                ? 'Chưa thanh toán đặt cọc'
                : invoice.status === 1
                  ? 'Chờ xác nhận thanh toán đặt cọc'
                  : invoice.status === -1
                    ? 'Hóa đơn đã bị hủy'
                    : 'Đã thanh toán đặt cọc'}
            </p>
            <p>Ghi chú: {invoice.note}</p>
          </div>
          <div className={cx('content_body')}>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>STT</th>
                  <th scope='col'>Mã phòng</th>
                  <th scope='col'>Phòng</th>
                  <th scope='col'>Check In</th>
                  <th scope='col'>Check Out</th>
                  <th scope='col'>Tiền phòng</th>
                  <th scope='col'>Tiền đặt cọc</th>
                </tr>
              </thead>
              <tbody>{renderBookings()}</tbody>
            </table>
          </div>
          <div>
            {invoice.status === 0 ? (
              <h4 style={{ fontWeight: '600', color: 'red' }}>
                Tổng tiền đặt cọc cần thanh toán: {totalAmount.toLocaleString('vi-VN')}đ
              </h4>
            ) : invoice.status === 1 ? (
              <h4 style={{ fontWeight: '600', color: 'red' }}>Chờ xác nhận thanh toán đặt cọc!</h4>
            ) : invoice.status === -1 ? (
              <h4 style={{ fontWeight: '600', color: 'red' }}>Hóa đơn đã bị hủy!</h4>
            ) : (
              <h4 style={{ fontWeight: '600', color: 'green' }}>Đã thanh toán tiền đặt cọc!</h4>
            )}
          </div>
        </div>
        <div className={cx('header_button_container')}>
          <button onClick={() => navigate(-1)} className={cx('header_button', 'btn', 'btn-primary', 'mr-3')}>
            Quay lại
          </button>
          {invoice.status === 1 && (
            <button onClick={handleConfirmPayment} className={cx('btn', 'btn-success', 'mr-3')}>
              Xác nhận đặt cọc
            </button>
          )}
          {(invoice.status === 0 || invoice.status === 1) && (
            <button onClick={handleRejectPayment} className={cx('btn', 'btn-danger')}>
              Hủy
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceInfoAdmin
