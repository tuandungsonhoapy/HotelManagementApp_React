import classNames from 'classnames/bind'
import styles from './RealEstateItem.module.scss'
import { Link } from 'react-router-dom'
import { interfaceRoom_HomePage } from 'pages/Home/HomePage'
import configRoutes from '../../../../config'
import { Alert } from 'react-bootstrap'
import { useAppDispatch } from 'store'
import { getRoom } from 'pages/booking.slice'

const cx = classNames.bind(styles)

interface Props {
  room: interfaceRoom_HomePage
}

const RealEstateItem = ({ room }: Props) => {
  const disPatch = useAppDispatch()

  const handleClick = () => {
    disPatch(getRoom(room.id))
  }

  return (
    <Link to={configRoutes.routes.booking} onClick={handleClick}>
      <div className={cx('property-item')}>
        <img
          src='https://cloud.mogi.vn/images/thumb-small/2024/03/01/540/fd592788ee2e41b7b0d861daea7308e3.jpg'
          alt='mpgi'
        />
        <Link to={configRoutes.routes.booking} onClick={handleClick}>
          <h3 className={cx('property-title')}>Phòng {room.roomNumber}</h3>
        </Link>
        <div className={cx('property-attr')}>
          <span>{room.Category.description}</span>
        </div>
        <div className={cx('price')}>{room.price}đ</div>
      </div>
    </Link>
  )
}

export default RealEstateItem
