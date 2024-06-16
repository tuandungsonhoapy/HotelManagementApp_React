import classNames from 'classnames/bind'
import styles from './ServiceList.module.scss'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'
import { useNavigate } from 'react-router-dom'
import configRoutes from '../../config'

const cx = classNames.bind(styles)

interface interfaceService {
  id: number
  serviceName: string
  description: string
  price: number
}

const ServiceList = () => {
  const [services, setServices] = useState<interfaceService[]>([])

  const renderServices = () => {
    return services.map((service, index) => {
      return (
        <tr key={service.id}>
          <th scope='row'>{index + 1}</th>
          <td>{service.serviceName}</td>
          <td>{service.description}</td>
          <td>{service.price.toLocaleString('vi-VN')}đ</td>
          <td>
            <button className={cx('btn', 'btn-primary', 'mr-3')}>Đặt dịch vụ</button>
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    http
      .get('/services')
      .then((response) => {
        setServices(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className={cx('servicePage_container')}>
      <div className={cx('header_container')}>
        <h3>Danh sách các dịch vụ</h3>
      </div>
      <div className={cx('body_container', 'container')}>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Tên dịch vụ</th>
              <th scope='col'>Mô tả</th>
              <th scope='col'>Giá tiền</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{renderServices()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ServiceList
