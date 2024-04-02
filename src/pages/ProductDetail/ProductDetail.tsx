import classNames from 'classnames/bind'
import styles from './ProductDetail.module.scss'

const cx = classNames.bind(styles)

const ProductDetail = (props: any) => (
  <div className={cx('productdetail_contaier')}>
    <div>This is ProductDetail page!</div>
  </div>
)

export default ProductDetail
