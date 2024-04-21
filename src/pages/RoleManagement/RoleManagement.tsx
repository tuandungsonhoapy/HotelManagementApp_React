import classNames from 'classnames/bind'
import styles from './RoleManagement.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPencil, faPlus, faRefresh, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { toast } from 'react-toastify'
import ConfirmModal from 'components/Modal'
import { v4 as uuidv4 } from 'uuid'
import http from 'Utils/httpRequest'
import { useDebounce } from 'hooks'

const cx = classNames.bind(styles)

interface interfaceFormData {
  id: string
  url: string
  description: string
}

const initialFormData: interfaceFormData[] = []

const initialDataModel: interfaceFormData = {
  id: '',
  url: '',
  description: ''
}

const RoleConstant = ['/roles', '/role/create', '/role/update', '/role/delete', '/role/search']

const RoleManagement = () => {
  console.log('rerender-RoleManagement!')
  const [formData, setFormData] = useState<interfaceFormData[]>(initialFormData)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [arrErrorInput, setArrErrorInput] = useState<string[]>([])
  const [deleteData, setDeleteData] = useState<interfaceFormData>(initialDataModel)
  const [updateData, setUpdateData] = useState<interfaceFormData[]>(initialFormData)
  const [searchData, setSearchData] = useState<string>('')

  const debouncedValue = useDebounce(searchData, 700)

  //Hàm cập nhật lại giá trị url trong updateData
  const updateObjectInArray = (id: string, url: string) => {
    const newUpdateData = updateData.map((item) => {
      if (item.id === id) {
        return { ...item, url }
      }
      return item
    })
    setUpdateData(newUpdateData)
  }

  //Hàm cập nhật lại giá trị description trong updateData
  const updateDescriptionInArray = (id: string, description: string) => {
    const newUpdateData = updateData.map((item) => {
      if (item.id === id) {
        return { ...item, description }
      }
      return item
    })
    setUpdateData(newUpdateData)
  }

  const handleOnChangeUrl = (index: number, newValue: string, id: string) => {
    const isExist = arrErrorInput.some((errorItem) => errorItem === id)
    const isExistUpdate = updateData.some((role) => role.id === id)
    let _newState = _.cloneDeep(formData)
    _newState[index].url = newValue
    setFormData(_newState)
    if (isExist) {
      const _newArrErrorInput = arrErrorInput.filter((item) => item !== id)
      setArrErrorInput(_newArrErrorInput)
    }
    if (isExistUpdate) {
      updateObjectInArray(id, newValue)
    }
  }

  const handleOnChangeDescription = (index: number, newValue: string, id: string) => {
    let _newState = _.cloneDeep(formData)
    _newState[index].description = newValue
    setFormData(_newState)
    const isExistUpdate = updateData.some((role) => role.id === id)
    if (isExistUpdate) {
      updateDescriptionInArray(id, newValue)
    }
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

  //Hàm cập nhật lại id cho những role mới thêm vào
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

  //Hàm cập nhật lại id cho những role cần update
  const UpdateIdFormDataUpdate = (roles: interfaceFormData[]) => {
    const newFormData = updateData.map((item) => {
      const role = roles.find((role) => role.url === item.url)
      if (role) {
        return role
      }
      return item
    })
    setUpdateData(newFormData)
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
    const isExistUpdate = updateData.some((role) => role.id === deleteData.id)
    if (isExistUpdate) {
      handleRemoveUpdateData(deleteData)
    }
  }

  //Function hiện thông báo yêu cầu xác nhận
  const handleShowModal = (role: interfaceFormData) => {
    if (RoleConstant.some((item) => item === role.url)) {
      toast.error('Không thể xóa role này!')
      return
    }
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
          UpdateIdFormDataUpdate(res.data)
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

  const handleAddUpdateData = (role: interfaceFormData) => {
    if (RoleConstant.some((item) => item === role.url)) {
      toast.error('Không thể cập nhật role này!')
      return
    }
    const newUpdateData = updateData.filter((item) => item.id !== role.id)
    newUpdateData.push(role)
    setUpdateData(newUpdateData)
  }

  const handleRemoveUpdateData = (role: interfaceFormData) => {
    const newUpdateData = updateData.filter((item) => item.id !== role.id)
    setUpdateData(newUpdateData)
  }

  useEffect(() => {
    if (!debouncedValue.trim()) {
      fetchData()
      return
    }
    if (debouncedValue) {
      http
        .get(`role/search`, {
          params: {
            search: debouncedValue
          }
        })
        .then((res) => {
          setFormData(res.data)
          setUpdateData([])
        })
        .catch((err) => {
          console.log('Error:', err.message)
        })
    }
  }, [debouncedValue])

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
            onChange={(e) => handleOnChangeDescription(index, e.target.value, item.id)}
          />
        </div>
        <div className={cx('div-group', 'col-sm-3', 'form-group')}>
          <button onClick={() => HandleClickNewInput(index)} className={cx('btn', 'btn-success', 'mr-3')}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={() => handleShowModal(item)} className={cx('btn', 'btn-danger', 'mr-3')}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {updateData.some((role) => role.id === item.id) ? (
            <>
              <button onClick={() => handleRemoveUpdateData(item)} className={cx('btn', 'btn-warning')}>
                <FontAwesomeIcon icon={faBan} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleAddUpdateData(item)} className={cx('btn', 'btn-warning')}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </>
          )}
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

  const handleRefresh = () => {
    setUpdateData([])
    setArrErrorInput([])
    fetchData()
  }

  const handleUpdateData = () => {
    const check = Validation_FormData()
    if (!check) {
      toast.error('Vui lòng nhập URL!')
      return
    }
    if (updateData.length > 0) {
      http
        .put('role/update', updateData)
        .then((res: any) => {
          toast.success(res.message)
          setUpdateData([])
        })
        .catch((err) => {
          console.log('Error:', err.message)
          toast.error('Cập nhật role thất bại!')
        })
    }
  }

  return (
    <>
      <div className={cx('container', 'RoleManagement_container')}>
        <div className={cx('header_container')}>
          <div className={cx('create_form')}>
            <div className={cx('header_create_form', 'd-flex', 'justify-content-between')}>
              <div className={cx('d-flex', 'mb-3', 'align-items-center')}>
                <h5>Thêm mới role:</h5>
                <button
                  onClick={() => HandleClickNewInput(formData.length - 1)}
                  className={cx('btn', 'btn-success', 'mr-3', 'ml-3')}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className={cx('d-flex', 'align-items-center', 'mb-4', 'mr-44')}>
                <span>Search: </span>
                <input
                  className={cx('form-control', 'input_search', 'ml-2')}
                  type='text'
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
              </div>
            </div>
            <div className={cx('input_form_container')}>{renderInputForm()}</div>
            <div>
              <button className={cx('btn', 'btn-primary', 'mt-2', 'mr-4')} onClick={() => handleClickSave()}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className={cx('btn', 'btn-primary', 'mt-2', 'mr-4')} onClick={handleRefresh}>
                <FontAwesomeIcon icon={faRefresh} />
              </button>
              {updateData.length > 0 && (
                <button className={cx('btn', 'btn-primary', 'mt-2')} onClick={handleUpdateData}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title='Confirm delete!'
        notification={`Bạn có chắc chắn muốn xóa role: ${deleteData.url}`}
        action='Delete'
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleClickDelete={HandleClickDeleteInput}
      />
    </>
  )
}

export default RoleManagement
