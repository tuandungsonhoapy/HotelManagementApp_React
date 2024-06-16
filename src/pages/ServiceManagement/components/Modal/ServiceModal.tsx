import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import _ from 'lodash'
import styles from './ServiceModal.module.scss'
import {
  Service,
  setDefaultService,
  setDescription,
  setServiceName,
  setPrice
} from 'pages/ServiceManagement/service.slice'

const cx = classNames.bind(styles)

interface interfaceProps {
  title: string
  showModal: boolean
  handleHileModal: () => void
  action: string
  handleCreateService: (data: Service) => any
  handleUpdateService: (data: Service) => any
}

interface FormError {
  serviceName: boolean
  price: boolean
  [key: string]: boolean
}

const initialFormError: FormError = {
  serviceName: false,
  price: false
}

function ServiceModal({
  title,
  showModal,
  handleHileModal,
  action,
  handleCreateService,
  handleUpdateService
}: interfaceProps) {
  const [formErrorService, setFormErrorService] = useState<FormError>(initialFormError)
  const service = useSelector((state: RootState) => state.service.service)

  const disPatch = useAppDispatch()

  const resultCheckError = useRef(false)

  //Thực hiện validate register form before call api
  const validateRegisterInfo = () => {
    setFormErrorService(initialFormError)
    resultCheckError.current = false
    const arr = ['serviceName', 'price']
    let _formErrorUser = _.cloneDeep(initialFormError)
    for (let i = 0; i < arr.length; i++) {
      if (!service[arr[i]]) {
        _formErrorUser[arr[i]] = true
        setFormErrorService(() => _formErrorUser)
        resultCheckError.current = true
      }
    }
    if (resultCheckError.current === true) return false
    return true
  }

  const handleCloseServiceModal = () => {
    disPatch(setDefaultService())
    setFormErrorService(initialFormError)
    handleHileModal()
  }

  const handleAccept = async () => {
    let check = validateRegisterInfo()
    if (check) {
      if (action === 'Create') {
        const result = await handleCreateService(service)
        if (result.check === true) {
          handleCloseServiceModal()
        } else {
          if (result.data) {
            const errorProperty = result.data
            let _formErrorUser = _.cloneDeep(initialFormError)
            _formErrorUser[errorProperty] = true
            setFormErrorService(() => _formErrorUser)
          }
        }
      } else {
        const result = await handleUpdateService(service)
        if (result.check === true) {
          handleCloseServiceModal()
        } else {
          if (result.data) {
            const errorProperty = result.data
            let _formErrorUser = _.cloneDeep(initialFormError)
            _formErrorUser[errorProperty] = true
            setFormErrorService(() => _formErrorUser)
          }
        }
      }
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
    }
  }

  return (
    <Modal
      onHide={handleCloseServiceModal}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      show={showModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx('content-body')}>
          <div className={cx('row')}>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                placeholder='Tên dịch vụ'
                className={cx('form-control', {
                  'is-invalid': formErrorService.serviceName
                })}
                type='text'
                value={service.serviceName}
                onChange={(e) => disPatch(setServiceName(e.target.value))}
              />
            </div>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                // disabled={action === 'Create' ? false : true}
                placeholder='Giá dịch vụ'
                className={cx('form-control', {
                  'is-invalid': formErrorService.price
                })}
                type='number'
                value={service.price}
                onChange={(e) => disPatch(setPrice(parseInt(e.target.value)))}
              />
            </div>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                placeholder='Mô tả'
                className={cx('form-control')}
                type='text'
                value={service.description || ''}
                onChange={(e) => disPatch(setDescription(e.target.value))}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseServiceModal}>
          Close
        </Button>
        <Button onClick={handleAccept}>{action}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ServiceModal
