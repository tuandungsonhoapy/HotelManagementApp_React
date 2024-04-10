import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import classNames from 'classnames/bind'
import styles from './UserModal.module.scss'
import { useEffect, useRef, useState } from 'react'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import {
  setDefaultFormRegister,
  setFirstNameRegister,
  setGroupRegister,
  setLastNameRegister,
  setPhoneRegister,
  setUsernameRegister
} from 'pages/auth.slice'
import _ from 'lodash'
import { interfaceRegister } from 'types/auth.type'

const cx = classNames.bind(styles)

interface interfaceProps {
  title: string
  showModal: boolean
  handleHileModal: () => void
  action: string
  handleCreateUser: (data: interfaceRegister) => any
  handleUpdateUser: (data: interfaceRegister) => any
}

interface interfaceGroup {
  id: number
  groupName: string
  description: string
}

interface FormError {
  firstName: boolean
  lastName: boolean
  username: boolean
  phone: boolean
  [key: string]: boolean
}

const initialFormError: FormError = {
  firstName: false,
  lastName: false,
  username: false,
  phone: false
}

function UserModal({ title, showModal, handleHileModal, action, handleCreateUser, handleUpdateUser }: interfaceProps) {
  const [groupList, setGroupList] = useState<interfaceGroup[]>([])
  const registerInfo = useSelector((state: RootState) => state.auth.registerInfo)
  const [formErrorUser, setFormErrorUser] = useState<FormError>(initialFormError)

  const disPatch = useAppDispatch()

  const resultCheckError = useRef(false)

  //Thực hiện validate register form before call api
  const validateRegisterInfo = () => {
    setFormErrorUser(initialFormError)
    resultCheckError.current = false
    const arr = ['firstName', 'lastName', 'username', 'phone']
    let _formErrorUser = _.cloneDeep(initialFormError)
    for (let i = 0; i < arr.length; i++) {
      if (!registerInfo[arr[i]]) {
        _formErrorUser[arr[i]] = true
        setFormErrorUser(() => _formErrorUser)
        resultCheckError.current = true
      }
    }
    if (resultCheckError.current === true) return false
    return true
  }

  //Lấy thông tin danh sách các nhóm vai trò
  useEffect(() => {
    http
      .get('groups')
      .then((response) => {
        setGroupList(response.data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }, [])

  //Render danh sách vai trò tài khoản
  const renderGroupList = () => {
    return (
      <>
        {groupList.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.groupName}
            </option>
          )
        })}
      </>
    )
  }

  const handleCloseUserModal = () => {
    disPatch(setDefaultFormRegister())
    setFormErrorUser(initialFormError)
    handleHileModal()
  }

  const handleChangeGroupInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    disPatch(setGroupRegister(parseInt(event.target.value)))
  }

  const handleAccept = async () => {
    let check = validateRegisterInfo()
    if (check) {
      if (action === 'Create') {
        const result = await handleCreateUser(registerInfo)
        if (result.check === true) {
          handleCloseUserModal()
        } else {
          if (result.data) {
            const errorProperty = result.data
            let _formErrorUser = _.cloneDeep(initialFormError)
            _formErrorUser[errorProperty] = true
            setFormErrorUser(() => _formErrorUser)
          }
        }
      } else {
        const result = await handleUpdateUser(registerInfo)
        if (result.check === true) {
          handleCloseUserModal()
        } else {
          if (result.data) {
            const errorProperty = result.data
            let _formErrorUser = _.cloneDeep(initialFormError)
            _formErrorUser[errorProperty] = true
            setFormErrorUser(() => _formErrorUser)
          }
        }
      }
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
    }
  }

  return (
    <Modal
      onHide={handleCloseUserModal}
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
                placeholder='Họ'
                className={cx('form-control', {
                  'is-invalid': formErrorUser.firstName
                })}
                type='text'
                value={registerInfo.firstName}
                onChange={(e) => disPatch(setFirstNameRegister(e.target.value))}
              />
            </div>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                placeholder='Tên'
                className={cx('form-control', {
                  'is-invalid': formErrorUser.lastName
                })}
                type='text'
                value={registerInfo.lastName}
                onChange={(e) => disPatch(setLastNameRegister(e.target.value))}
              />
            </div>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                // disabled={action === 'Create' ? false : true}
                placeholder='username'
                className={cx('form-control', {
                  'is-invalid': formErrorUser.username
                })}
                type='text'
                value={registerInfo.username}
                onChange={(e) => disPatch(setUsernameRegister(e.target.value))}
              />
            </div>
            {/* {action === 'Create' && (
              <div className={cx('col-6', 'form-group', 'mb-3')}>
                <input
                  placeholder='password'
                  className={cx('form-control', {
                    'is-invalid': formErrorUser.password
                  })}
                  type='password'
                  value={registerInfo.password}
                  onChange={(e) => disPatch(setPasswordRegister(e.target.value))}
                />
              </div>
            )} */}
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                placeholder='phone'
                className={cx('form-control', {
                  'is-invalid': formErrorUser.phone
                })}
                type='text'
                value={registerInfo.phone}
                onChange={(e) => disPatch(setPhoneRegister(e.target.value))}
              />
            </div>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <select value={registerInfo.groupId} className={cx('form-select')} onChange={handleChangeGroupInput}>
                {renderGroupList()}
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseUserModal}>
          Close
        </Button>
        <Button onClick={handleAccept}>{action}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserModal
