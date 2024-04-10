import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

type Component = string | React.ComponentType<any>

interface buttonProps {
  to?: string
  href?: string
  primary?: boolean
  outline?: boolean
  text?: boolean
  rounded?: boolean
  disabled?: boolean
  small?: boolean
  large?: boolean
  children?: React.ReactNode
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: Function
  bordered?: boolean
}

function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  small = false,
  large = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  bordered,
  ...passProps
}: buttonProps) {
  let Comp: Component = 'button'
  const props = {
    onClick,
    to,
    href,
    ...passProps
  }

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on')) {
        delete (props as { [key: string]: Function | undefined })[key]
      }
    })
  }

  if (to) {
    props.to = to
    Comp = Link
  } else if (href) {
    props.href = href
    Comp = 'a'
  }

  const classes = cx('wrapper', {
    className,
    primary,
    outline,
    text,
    disabled,
    rounded,
    small,
    large,
    bordered
  })

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  )
}

export default Button
