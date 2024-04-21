import './PaymentInformation.css'
import configRoutes from '../../config'
import { Link } from 'react-router-dom'

function PaymentInformation(props: any) {
  return (
    <div className='main-container'>
      <div className='rectangle'>
        <div className='flex-row-cd'>
          <img className='logo' src='https://mogi.vn/content/Images/logo.svg' alt='mogi' />
          <div className='ellipse' />
          <button className='ellipse-5' />
          <div className='ellipse-6' />
          <span className='span'>1</span>
          <span className='info'>2</span>
          <span className='vector-7'>v</span>

          <div className='vector-7' />

          <div className='rectangle-8' />
          <div className='rectangle-9' />
        </div>
        <div className='flex-row'>
          <span className='customer-info'>Thông tin khách hàng</span>
          <span className='payment-details'>Chi tiết thanh toán</span>
          <span className='confirmed-booking'>Đã xác nhận đặt phòng!</span>
        </div>
      </div>
      <div className='rectangle-a'>
        <div className='rectangle-b'>
          <button className='image-btn' />
          <button className='image-btn-c' />
          <div className='image' />
          <div className='image-d' />
          <div className='rectangle-e' />
          <span className='credit-debit-card'>CREDIT/DEBIT CARD</span>
          <div className='group' />
        </div>
        <div className='select-payment-method'>
          <span className='select-payment-method-f'>Select payment method</span>
          <span className='asterisk'>*</span>
        </div>
        <div className='rectangle-10' />
        <span className='last-step-almost-done'>Last step! You're almost done.</span>
        <div className='card-holder-name'>
          <span className='card-holder-name-11'>Card holder name </span>
          <span className='asterisk-12'>*</span>
        </div>
        <div className='rectangle-13' />
        <div className='credit-debit-card-number'>
          <span className='credit-debit-card-number-14'>Credit/debit card number </span>
          <span className='asterisk-15'>*</span>
        </div>
        <div className='rectangle-16' />
        <div className='flex-row-dd'>
          <div className='expiry-date'>
            <span className='expiry-date-17'>Expiry date </span>
            <span className='asterisk-18'>*</span>
          </div>
          <div className='cvc-cvv'>
            <span className='cvc-cvv-19'>CVC/CVV </span>
            <span className='asterisk-1a'>*</span>
          </div>
        </div>
        <div className='flex-row-fa'>
          <div className='rectangle-1b' />
          <div className='regroup'>
            <div className='rectangle-1c' />
            <div className='image-1d' />
          </div>
        </div>
      </div>
      <div className='rectangle-1e'>
        <div className='proceed-agree-terms'>
          <span className='proceed-agree-agoda'>By proceeding with this booking, I agree to Agoda’s</span>
          <span className='empty'> </span>
          <span className='terms-of-use'>Terms of Use</span>
          <span className='empty-1f'> </span>
          <span className='proceed-agree-agoda-20'>and</span>
          <span className='empty-21'> </span>
          <span className='privacy-policy'>Privacy Policy</span>
          <span className='period'>.</span>
        </div>
        <div className='rectangle-22'>
          <span className='book-now'>Book now!</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentInformation
