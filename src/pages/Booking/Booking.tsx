import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Booking.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { booking } from 'pages/booking.slice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import configRoutes from '../../config'

const cx = classNames.bind(styles)

const Booking = () => {
  const room = useSelector((state: RootState) => state.booking.room)
  const [startDate, setStartDate] = useState<Date>(new Date()) // Add the type annotation for startDate
  const [endDate, setEndDate] = useState<Date>(new Date()) // Add the type annotation for endDate

  const navigation = useNavigate()

  const disPatch = useAppDispatch()

  const handleBooking = () => {
    if (!room.id) {
      toast.error('Vui lòng chọn phòng trước khi đặt phòng')
      return
    }
    if (endDate <= startDate) {
      toast.error('Ngày checkout phải lớn hơn ngày checkin!')
      return
    }
    disPatch(booking({ roomId: room.id, startDate, endDate }))
      .unwrap()
      .then((response: any) => {
        if (response.code === 0) {
          toast.success('Đặt phòng thành công!')
          navigation(configRoutes.routes.paymentInvoice)
        } else {
          toast.error(response.message)
        }
      })
      .catch((error) => {
        toast.error('Đặt phòng thất bại!')
      })
  }

  return (
    <div className={cx('booking_container')}>
      <div className={cx('container')}>
        <h3>Phòng {room.roomNumber}</h3>
        <div className={cx('images_container', 'row')}>
          <img src={room.image} alt={room.roomNumber} />
        </div>
        <p>
          Tình trạng: {room.status === 0 ? 'Phòng trống' : room.status === 1 ? 'Phòng đã thuê' : 'Phòng đang dọn dẹp'}
        </p>
        <p>Loại phòng: {room.Category?.description}</p>
        <p>Giá phòng: {room.price.toLocaleString('vi-VN')}đ</p>
        <p>{room.description}</p>
        <p>Chọn ngày checkin:</p>
        <DatePicker
          className={cx('form_checkin')}
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
        />
        <p>Chọn ngày checkout:</p>
        <DatePicker className={cx('form_checkout')} selected={endDate} onChange={(date) => setEndDate(date as Date)} />
        <div className={cx('btn_container')}>
          <button onClick={handleBooking} className={cx('btn_booking', 'btn', 'btn-primary')}>
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default Booking
