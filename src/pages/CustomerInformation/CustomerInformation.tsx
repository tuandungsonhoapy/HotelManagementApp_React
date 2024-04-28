import './CustomerInformation.css'
import configRoutes from '../../config'
import { Link } from 'react-router-dom'

function CustomerInformation(props: any) {
  return (
    <div className='main-container'>
      <div className='rectangle'>
        <div className='flex-row'>
          <img className='logo' src='https://mogi.vn/content/Images/logo.svg' alt='mogi' />
          <div className='ellipse' />
          <div className='ellipse-5' />
          <div className='ellipse-6' />
          <span className='span'>1</span>
          <span className='info'>2</span>
          <span className='vector-7'>v</span>

          <div className='vector-7' />

          <div className='rectangle-8' />
          <div className='rectangle-9' />
        </div>
        <div className='flex-row-a'>
          <span className='customer-info'>Thông tin khách hàng</span>
          <span className='payment-details'>Chi tiết thanh toán</span>
          <span className='confirmed-booking'>Đã xác nhận đặt phòng!</span>
        </div>
      </div>
      <div className='rectangle-b'>
        <span className='fill-info'>Vui lòng điền thông tin của bạn</span>
        <div className='passport-name'>
          <span className='passport-name-c'>Họ và tên như trên hộ chiếu </span>
          <span className='required'>*</span>
        </div>
        <input type='text' className='rectangle-d' />
        
        <div className='email-input'>
          <span className='email-label'>Email</span>
          <span className='empty-space'> </span>
          <span className='required-sign'>*</span>
        </div>
        <input type='text' className='rectangle-n' />
        <span className='reminder-text'>
          Nếu quý khách nhập địa chỉ thư điện tử và không hoàn thành việc đặt phòng thì chúng tôi có thể nhắc nhở để
          giúp quý khách tiếp tục đặt phòng.
        </span>
        <div className='flex-row-f'>
          <div className='country-input'>
          <span className='phone-input'>Số điện thoại (không bắt buộc)</span>
          </div>
          <div className='country-input'>
            <span className='country-label'>Quốc gia cư trú</span>
            <span className='required-sign-10'>*</span>
          </div>
        </div>
        <div className='flex-row-11'>
          <input type='text' className='rectangle-12' />
          <input type='text' className='rectangle-13' />
        </div>
        <span className='cung-cap'>
          Các yêu cầu còn lệ thuộc vào khả năng cung cấp. Chúng tôi sẽ gửi các yêu cầu của quý khách ngay sau khi quý
          khách đặt phòng.
        </span>
        <div className='rectangle-14'>
          <span className='hut-thuoc'>Quy định hút thuốc (nếu có phòng):</span>
            
              <input type='checkbox' className='rectangle-16' />
            
            <span className='phong-hut-thuoc'>Phòng hút thuốc</span>
          <span className='chon-loai-giuong'>Chọn loại giường (nếu có phòng):</span>
          <div className='frame-17'>
            <div className='group-18'>
              <input type='checkbox' className='rectangle-19' />
            </div>
            <span className='non-smoking-room'>Tôi muốn lấy giường lớn</span>
          </div>
        </div>
      </div>
      <div className='rectangle-1a'>
        <div className='accept-terms'>
          <span className='accept-terms-1b'>Thực hiện bước tiếp theo đồng nghĩa với việc bạn chấp nhận</span>
          <span className='terms-of-use'>điều khoản sử dụng</span>
          <span className='accept-terms-1c'> và </span>
          <span className='privacy-policy'>chính sách bảo mật</span>
          <span className='mogi-policy'> của mogi.</span>
        </div>
        <span className='confirm-booking'>Có liền xác nhận đặt phòng!</span>
        <button className='rectangle-1d' />
        <span className='next-step'>KẾ TIẾP: BƯỚC CUỐI CÙNG</span>
      </div>
    </div>
  )
}

export default CustomerInformation
