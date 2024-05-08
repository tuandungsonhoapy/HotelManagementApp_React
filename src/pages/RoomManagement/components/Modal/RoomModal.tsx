import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import _ from 'lodash'
import styles from './RoomModal.module.scss'
import {
  interfaceRoom,
  interfaceCategory,
  setRoomNumber,
  setPrice,
  setImage,
  setCategoryId,
  setRoomStatus,
  setDefaultRoom
} from 'pages/RoomManagement/room.slice'

const cx = classNames.bind(styles)

interface interfaceProps {
  title: string
  showModal: boolean
  handleHileModal: () => void
  action: string
  handleCreateRoom: (data: interfaceRoom) => any
  handleUpdateRoom: (data: interfaceRoom) => any
}

interface FormError {
  roomNumber: boolean
  price: boolean
  image: boolean
  [key: string]: boolean
}

const initialFormError: FormError = {
  roomNumber: false,
  price: false,
  image: false
}

function RoomModal({ title, showModal, handleHileModal, action, handleCreateRoom, handleUpdateRoom }: interfaceProps) {
  const [categoryList, setCategoryList] = useState<interfaceCategory[]>([])
  const [formErrorRoom, setFormErrorRoom] = useState<FormError>(initialFormError)
  const room = useSelector((state: RootState) => state.room.room)

  const disPatch = useAppDispatch()

  const resultCheckError = useRef(false)

  //Thực hiện validate register form before call api
  const validateRegisterInfo = () => {
    setFormErrorRoom(initialFormError)
    resultCheckError.current = false
    const arr = ['roomNumber', 'price', 'image']
    let _formErrorUser = _.cloneDeep(initialFormError)
    for (let i = 0; i < arr.length; i++) {
      if (!room[arr[i]]) {
        _formErrorUser[arr[i]] = true
        setFormErrorRoom(() => _formErrorUser)
        resultCheckError.current = true
      }
    }
    if (resultCheckError.current === true) return false
    return true
  }

  //Lấy thông tin danh sách các nhóm vai trò
  useEffect(() => {
    http
      .get('categories')
      .then((response) => {
        setCategoryList(response.data)
        disPatch(setCategoryId(response.data[0].id))
      })
      .catch((error) => {
        toast.error(error.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      if (room.categoryId === 0 && categoryList.length > 0) {
        if (categoryList[0].id) {
          disPatch(setCategoryId(categoryList[0].id))
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room.categoryId === 0]
  )

  //Render danh sách vai trò tài khoản
  const renderCategoryList = () => {
    return (
      <>
        {categoryList.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.categoryName}
            </option>
          )
        })}
      </>
    )
  }

  const handleCloseRoomModal = () => {
    disPatch(setDefaultRoom())
    setFormErrorRoom(initialFormError)
    handleHileModal()
  }

  const handleChangeCategoryInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    disPatch(setCategoryId(parseInt(event.target.value)))
  }

  const handleAccept = async () => {
    let check = validateRegisterInfo()
    if (check) {
      if (action === 'Create') {
        const result = await handleCreateRoom(room)
        if (result.check === true) {
          handleCloseRoomModal()
        } else {
          if (result.data) {
            const errorProperty = result.data
            let _formErrorUser = _.cloneDeep(initialFormError)
            _formErrorUser[errorProperty] = true
            setFormErrorRoom(() => _formErrorUser)
          }
        }
      } else {
        const result = await handleUpdateRoom(room)
        if (result.check === true) {
          handleCloseRoomModal()
        } else {
          if (result.data) {
            const errorProperty = result.data
            let _formErrorUser = _.cloneDeep(initialFormError)
            _formErrorUser[errorProperty] = true
            setFormErrorRoom(() => _formErrorUser)
          }
        }
      }
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin!')
    }
  }

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    disPatch(setRoomStatus(parseInt(event.target.value)))
  }

  return (
    <Modal
      onHide={handleCloseRoomModal}
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
                placeholder='Tên phòng'
                className={cx('form-control', {
                  'is-invalid': formErrorRoom.roomNumber
                })}
                type='text'
                value={room.roomNumber}
                onChange={(e) => disPatch(setRoomNumber(e.target.value))}
              />
            </div>
            {action === 'Update' && (
              <div className={cx('col-6', 'form-group', 'mb-3')}>
                <select value={room.status} className={cx('form-select')} onChange={handleChangeStatus}>
                  <option value={0}>Phòng trống</option>
                  <option value={1}>Đã thuê</option>
                  <option value={-1}>Đang dọn dẹp</option>
                </select>
              </div>
            )}
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                // disabled={action === 'Create' ? false : true}
                placeholder='Giá phòng'
                className={cx('form-control', {
                  'is-invalid': formErrorRoom.price
                })}
                type='number'
                value={room.price}
                onChange={(e) => disPatch(setPrice(parseInt(e.target.value)))}
              />
            </div>
            {/* {action === 'Create' && (
              <div className={cx('col-6', 'form-group', 'mb-3')}>
                <input
                  placeholder='password'
                  className={cx('form-control', {
                    'is-invalid': formErrorRoom.password
                  })}
                  type='password'
                  value={room.password}
                  onChange={(e) => disPatch(setPasswordRegister(e.target.value))}
                />
              </div>
            )} */}
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <input
                placeholder='Hình ảnh'
                className={cx('form-control', {
                  'is-invalid': formErrorRoom.image
                })}
                type='text'
                value={room.image}
                onChange={(e) => disPatch(setImage(e.target.value))}
              />
            </div>
            <div className={cx('col-6', 'form-group', 'mb-3')}>
              <select value={room.categoryId} className={cx('form-select')} onChange={handleChangeCategoryInput}>
                {renderCategoryList()}
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseRoomModal}>
          Close
        </Button>
        <Button onClick={handleAccept}>{action}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RoomModal
