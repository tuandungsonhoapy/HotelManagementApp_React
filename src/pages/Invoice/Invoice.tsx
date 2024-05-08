import classNames from 'classnames/bind'
import styles from './Invoice.module.scss'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'

const cx = classNames.bind(styles)

interface interfaceInvoice {
  id: number
  status: number
  totalAmount: number
  note: string
  userId: number
}

const Invoice = () => {
  const [invoices, setInvoices] = useState<interfaceInvoice[]>([])

  const renderInvoices = () => {
    return invoices.map((invoice, index) => {
      return (
        <tr>
          <th scope='row'>{index + 1}</th>
          <td>{invoice.id}</td>
          <td>{invoice.totalAmount}</td>
          {invoice.status === 0 ? (
            <td className={cx('text-warning')}>Chưa thanh toán</td>
          ) : invoice.status === 1 ? (
            <td className={cx('text-success')}>Đã thanh toán</td>
          ) : (
            <td className={cx('text-danger')}>Cần thanh toán tiền đặt cọc</td>
          )}
          <td>
            <button className={cx('btn', 'btn-primary', 'mr-3')}>Thông tin chi tiết</button>
            <button className={cx('btn', 'btn-success')}>Thanh toán</button>
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    http
      .get('/invoice/by-user')
      .then((response) => {
        setInvoices(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className={cx('invoicePage_container')}>
      <div className={cx('header_container')}>
        <h3>Danh sách hóa đơn của bạn</h3>
      </div>
      <div className={cx('body_container', 'container')}>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Mã hóa đơn</th>
              <th scope='col'>Tổng tiền</th>
              <th scope='col'>Trạng thái</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{renderInvoices()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Invoice
