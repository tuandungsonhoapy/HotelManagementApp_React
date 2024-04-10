import classNames from 'classnames/bind'
import styles from './Wrapper.module.scss'

const cx = classNames.bind(styles)

interface wrapperProps {
  children: React.ReactNode
  className?: string
}

function Wrapper({ children, className }: wrapperProps) {
  return <div className={cx('wrapper', className)}>{children}</div>
}

export default Wrapper
