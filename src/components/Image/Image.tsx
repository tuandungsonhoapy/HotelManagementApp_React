import { useState, forwardRef } from 'react'
import classNames from 'classnames'
import images from '../../assets/images'
import styles from './Image.module.scss'

interface imageProps {
  src?: string | null
  alt?: string
  className?: string
  fallback?: string
}

const Image = forwardRef(
  (
    { src, alt, className, fallback: customFallback = images.noImage, ...props }: imageProps,
    ref: React.LegacyRef<HTMLImageElement>
  ) => {
    const [fallback, setFallback] = useState('')

    const handleError = () => {
      setFallback(customFallback)
    }

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={src || images.iconUserLogin || fallback}
        alt={alt}
        {...props}
        onError={handleError}
      />
    )
  }
)

export default Image
