import classNames from 'classnames/bind'
import styles from './RoleManagement.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRefresh, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import _, { set } from 'lodash'
import { toast } from 'react-toastify'
import ConfirmModal from 'components/Modal'
import { v4 as uuidv4 } from 'uuid'
import http from 'Utils/httpRequest'

const cx = classNames.bind(styles)

interface interfaceFormData {
  id: string
  url: string
  description: string
}

const initialFormData: interfaceFormData[] = [{ id: uuidv4(), url: '', description: '' }]

const initialDataModel: interfaceFormData = {
  id: '',
  url: '',
  description: ''
}

const RoleManagement = () => {
  console.log('rerender-RoleManagement!')
  const [formData, setFormData] = useState<interfaceFormData[]>(initialFormData)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<interfaceFormData>(initialDataModel)
  const [arrErrorInput, setArrErrorInput] = useState<string[]>([])
  const [deleteData, setDeleteData] = useState<interfaceFormData>(initialDataModel)

  const handleOnChangeUrl = (index: number, newValue: string, id: string) => {
    const isExist = arrErrorInput.some((errorItem) => errorItem === id)
    let _newState = _.cloneDeep(formData)
    _newState[index].url = newValue
    setFormData(_newState)
    if (isExist) {
      const _newArrErrorInput = arrErrorInput.filter((item) => item !== id)
      setArrErrorInput(_newArrErrorInput)
    }
  }

  const handleOnChangeDescription = (index: number, newValue: string) => {
    let _newState = _.cloneDeep(formData)
    _newState[index].description = newValue
    setFormData(_newState)
  }

  const HandleClickNewInput = (index: number) => {
    let _newState = _.cloneDeep(formData)
    const value: interfaceFormData = {
      id: uuidv4(),
      url: '',
      description: ''
    }
    _newState.splice(index + 1, 0, value)
    setFormData(_newState)
  }

  const handleDeleteData = (role: interfaceFormData) => {
    console.log('role:', role)
    const newFormData = formData.filter((item) => item.id !== role.id)
    console.log('newFormData:', newFormData)
    setFormData(newFormData)
  }

  function isNumber(value: any): value is number {
    return typeof value === 'number'
  }

  const UpdateIdFormData = (roles: interfaceFormData[]) => {
    console.log('>>>>>>>>>>>>roles:', roles)
    const newFormData = formData.map((item) => {
      const role = roles.find((role) => role.url === item.url)
      if (role) {
        return role
      }
      return item
    })
    setFormData(newFormData)
  }

  const HandleClickDeleteInput = () => {
    if (isNumber(deleteData.id)) {
      http
        .delete(`role/delete`, {
          data: {
            id: deleteData.id
          }
        })
        .then((res: any) => {
          toast.success(res.message)
          handleDeleteData(res.data)
          console.log('>>>>>>>>>>>> data:', res.data)
        })
        .catch((err) => {
          console.log('Error:', err)
          toast.error(err.message)
        })
    } else {
      handleDeleteData(deleteData)
    }
    setShowModal(false)
  }

  //Function hiện thông báo yêu cầu xác nhận
  const handleShowModal = (role: interfaceFormData) => {
    setShowModal(true)
    setDeleteData(role)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setDeleteData(initialDataModel)
  }

  const Validation_FormData = () => {
    let check = true
    const initial: string[] = []
    setArrErrorInput(initial)
    let _newState = _.cloneDeep(initial)
    formData.map((item, index) => {
      if (!item.url) {
        _newState.push(item.id)
        setArrErrorInput(_newState)
        check = false
      }
    })
    return check
  }

  const handleClickSave = () => {
    const check = Validation_FormData()
    if (check) {
      const data = buildData()
      http
        .post('role/create', data)
        .then((res: any) => {
          toast.success(res.message)
          UpdateIdFormData(res.data)
        })
        .catch((err) => {
          console.log('Error:', err)
          toast.error('Thêm mới role thất bại!')
        })
    } else {
      toast.error('Vui lòng nhập URL!')
    }
  }

  const buildData = () => {
    const data = formData.map((item) => {
      return {
        url: item.url,
        description: item.description
      }
    })
    return data
  }

  const renderInputForm = () => {
    return formData.map((item, index) => (
      <div className={cx('row', 'mb-3')} key={index}>
        <div className={cx('div-group', 'col-sm-4', 'form-group')}>
          <input
            placeholder='URL'
            className={cx('form-control', {
              'is-invalid': arrErrorInput.some((errorItem) => errorItem === item.id)
            })}
            type='text'
            value={item.url}
            onChange={(e) => handleOnChangeUrl(index, e.target.value, item.id)}
          />
        </div>
        <div className={cx('div-group', 'col-sm-5', 'form-group')}>
          <input
            placeholder='Mô tả'
            className={cx('form-control')}
            type='text'
            value={item.description}
            onChange={(e) => handleOnChangeDescription(index, e.target.value)}
          />
        </div>
        <div className={cx('div-group', 'col-sm-3', 'form-group')}>
          <button onClick={() => HandleClickNewInput(index)} className={cx('btn', 'btn-success', 'mr-3')}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={() => handleShowModal(item)} className={cx('btn', 'btn-danger')}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    ))
  }

  const fetchData = () => {
    http
      .get('roles')
      .then((res) => {
        setFormData(res.data)
      })
      .catch((err) => {
        console.log('Error:', err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className={cx('container', 'RoleManagement_container')}>
        <div className={cx('header_container')}>
          <div className={cx('create_form')}>
            <div className={cx('d-flex', 'mb-3', 'align-items-center')}>
              <h5>Thêm mới role:</h5>
              <button
                onClick={() => HandleClickNewInput(formData.length - 1)}
                className={cx('btn', 'btn-success', 'mr-3', 'ml-3')}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className={cx('input_form_container')}>{renderInputForm()}</div>
            <div>
              <button className={cx('btn', 'btn-primary', 'mt-2', 'mr-4')} onClick={() => handleClickSave()}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className={cx('btn', 'btn-primary', 'mt-2')} onClick={() => fetchData()}>
                <FontAwesomeIcon icon={faRefresh} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title='Confirm delete!'
        notification={`Bạn có chắc chắn muốn xóa role: ${dataModal.url}!`}
        action='Delete'
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleClickDelete={HandleClickDeleteInput}
      />
    </>
  )
}

export default RoleManagement
