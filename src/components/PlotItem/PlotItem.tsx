import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './PlotItem.module.scss'
import Image from '../Image'

const cx = classNames.bind(styles)

function PlotItem({ data }: any) {
  console.log(data)
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.full_name}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('username')}>{data.nickname}</span>
      </div>
    </Link>
  )
}

export default PlotItem
