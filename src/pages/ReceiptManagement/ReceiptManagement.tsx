import classNames from 'classnames/bind'
import styles from './ReceiptManagement.module.scss'

const cx = classNames.bind(styles)

const ReceiptManagement = () => {
  return (
    <div className={cx('receipt-management_container')}>
      <div className={cx('container', 'header_content', 'd-flex', 'justify-content-between')}>
        <div className={cx('container')}></div>
      </div>
      <div className={cx('body_container')}>
        <div className={cx('container')}>
          <table className={cx('table_receipts', 'table')}>
            <thead className={cx('table-dark')}>
              <tr>
                <th>STT</th>
                <th>Mã biên lai</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Thời gian tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReceiptManagement
