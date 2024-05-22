import classNames from 'classnames/bind'
import styles from './InvoiceManagement.module.scss'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import configRoutes from '../../config'

const cx = classNames.bind(styles)

interface interfaceInvoice {
  id: number
  status: number
  totalAmount: number
  note: string
  createdAt: string
  userId: number
  payments: number
}

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState<interfaceInvoice[]>([])

  const navigate = useNavigate()

  const handleShowInvoiceDetail = (invoiceId: number) => {
    navigate(configRoutes.routes.invoiceInfoAdmin, { state: { invoiceId } })
  }

  const handleCompletePayment = (invoiceId: number) => {
    http
      .put('invoice/complete-payment', { invoiceId })
      .then((res) => {
        toast.success('Thanh toán hóa đơn thành công')
        setInvoices(
          invoices.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: 3, payments: 0 } : invoice))
        )
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const renderInvoices = () => {
    return invoices.map((invoice, index) => {
      return (
        <tr key={invoice.id}>
          <th scope='row'>{index + 1}</th>
          <td>{invoice.id}</td>
          {invoice.status === 0 ? (
            <td className={cx('text-danger')}>Chưa thanh toán đặt cọc</td>
          ) : invoice.status === 1 ? (
            <td className={cx('text-danger')}>Chờ xác nhận đặt cọc</td>
          ) : invoice.status === 2 ? (
            <td className={cx('text-warning')}>Chưa hoàn tất thanh toán</td>
          ) : invoice.status === 3 ? (
            <td className={cx('text-success')}>Đã hoàn tất thanh toán</td>
          ) : (
            <td className={cx('text-danger')}>Đã hủy</td>
          )}
          <td>{invoice.totalAmount.toLocaleString('vi-VN')}đ</td>
          <td>{invoice.payments.toLocaleString('vi-VN')}đ</td>
          <td>{invoice.createdAt}</td>
          <td>
            <button onClick={() => handleShowInvoiceDetail(invoice.id)} className={cx('btn', 'btn-primary', 'mr-3')}>
              Xem chi tiết
            </button>
            {invoice.status === 2 && (
              <button onClick={() => handleCompletePayment(invoice.id)} className={cx('btn', 'btn-success', 'mr-3')}>
                Hoàn tất thanh toán
              </button>
            )}

            {/* <button className={cx('btn', 'btn-danger')}>Hủy</button> */}
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    http
      .get('/invoices')
      .then((res) => {
        setInvoices(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  return (
    <div className={cx('invoice-management_container')}>
      <div className={cx('container', 'header_content', 'd-flex', 'justify-content-between')}>
        <div className={cx('container')}></div>
      </div>
      <div className={cx('body_container')}>
        <div className={cx('container')}>
          <table className={cx('table_invoices', 'table')}>
            <thead className={cx('table-dark')}>
              <tr>
                <th>STT</th>
                <th>Mã hóa đơn</th>
                <th>Trạng thái</th>
                <th>Tổng tiền hóa đơn</th>
                <th>Tổng tiền cần thanh toán</th>
                <th>Thời gian tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderInvoices()}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InvoiceManagement
