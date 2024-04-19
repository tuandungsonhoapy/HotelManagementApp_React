import React from 'react'
import classNames from 'classnames/bind'
import styles from './ButtonReact.module.scss'

const cx = classNames.bind(styles)

interface buttonProps {
  type: string
  className?: string
  onClick?: () => void
}

const ButtonReact: React.FC<buttonProps> = ({ type, className, onClick }: buttonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault() // Ngăn chặn hành động mặc định của nút
    const input = event.currentTarget.parentNode?.querySelector('input[type=number]') as HTMLInputElement | null
    if (input) {
      type === 'decrease' ? input.stepDown() : input.stepUp()
    }
  }

  return <button className={cx(className)} onClick={onClick} />
}

export default ButtonReact
