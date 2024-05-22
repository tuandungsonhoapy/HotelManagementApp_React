import classNames from 'classnames/bind'
import styles from './InvoiceInfo.module.scss'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'
import { useLocation, useNavigate } from 'react-router-dom'
import { set } from 'lodash'
import configRoutes from '../../config'

const cx = classNames.bind(styles)

interface interfaceInvoice {
  id: number
  note: string
  status: number
}

const initialInvoice: interfaceInvoice = {
  id: 0,
  note: '',
  status: -2
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

const InvoiceInfo = () => {
  const location = useLocation()
  const invoiceId = location.state.invoiceId
  const [invoice, setInvoice] = useState<interfaceInvoice>(initialInvoice)
  const [rooms, setRooms] = useState<interfaceRoom[]>([])

  const navigation = useNavigate()

  const totalAmount = rooms.reduce((total, room) => total + room.Booking.price, 0)

  useEffect(() => {
    http.get('booking/by-invoice', { params: { invoiceId: invoiceId } }).then((res) => {
      setInvoice(res.data)
      setRooms(res.data.Rooms)
    })
  }, [invoiceId])

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

  const handleClickpayDeposit = () => {
    http
      .post('booking/block-rooms', rooms)
      .then(() => {
        navigation(configRoutes.routes.paymentinformation, { state: { invoiceId, totalAmount, rooms } })
      })
      .catch(() => {
        alert('Đã có lỗi xảy ra')
      })
  }

  return (
    <div className={cx('InvoiceInfo_container', 'container')}>
      <div className={cx('header_container')}>
        <h3>Thông tin hóa đơn</h3>
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
          ) : (
            <h4 style={{ fontWeight: '600', color: 'green' }}>Đã thanh toán tiền đặt cọc!</h4>
          )}

          <button
            disabled={invoice.status === 1}
            hidden={invoice.status === 1}
            style={{ fontWeight: '500' }}
            onClick={handleClickpayDeposit}
            className={cx('btn', 'btn-primary')}
          >
            Thanh toán tiền đặt cọc
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceInfo
