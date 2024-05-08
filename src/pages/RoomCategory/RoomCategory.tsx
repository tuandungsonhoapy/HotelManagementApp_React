import classNames from 'classnames/bind'
import styles from './RoomCategory.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBan, faPencil, faPlus, faRefresh, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { toast } from 'react-toastify'
import ConfirmModal from 'components/Modal'
import { v4 as uuidv4 } from 'uuid'
import http from 'Utils/httpRequest'
import { useDebounce } from 'hooks'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

interface interfaceFormData {
  id: string
  categoryName: string
  description: string
}

const initialFormData: interfaceFormData[] = []

const initialDataModel: interfaceFormData = {
  id: '',
  categoryName: '',
  description: ''
}

const RoleConstant: any[] = []

const RoomCategory = () => {
  console.log('rerender-RoleManagement!')
  const [formData, setFormData] = useState<interfaceFormData[]>(initialFormData)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [arrErrorInput, setArrErrorInput] = useState<string[]>([])
  const [deleteData, setDeleteData] = useState<interfaceFormData>(initialDataModel)
  const [updateData, setUpdateData] = useState<interfaceFormData[]>(initialFormData)
  const [searchData, setSearchData] = useState<string>('')

  const navigation = useNavigate()

  const debouncedValue = useDebounce(searchData, 700)

  //Hàm cập nhật lại giá trị categoryName trong updateData
  const updateObjectInArray = (id: string, categoryName: string) => {
    const newUpdateData = updateData.map((item) => {
      if (item.id === id) {
        return { ...item, categoryName }
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
    const isExistUpdate = updateData.some((category) => category.id === id)
    let _newState = _.cloneDeep(formData)
    _newState[index].categoryName = newValue
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
    const isExistUpdate = updateData.some((category) => category.id === id)
    if (isExistUpdate) {
      updateDescriptionInArray(id, newValue)
    }
  }

  const HandleClickNewInput = (index: number) => {
    let _newState = _.cloneDeep(formData)
    const value: interfaceFormData = {
      id: uuidv4(),
      categoryName: '',
      description: ''
    }
    _newState.splice(index + 1, 0, value)
    setFormData(_newState)
  }

  const handleDeleteData = (category: interfaceFormData) => {
    console.log('category:', category)
    const newFormData = formData.filter((item) => item.id !== category.id)
    console.log('newFormData:', newFormData)
    setFormData(newFormData)
  }

  function isNumber(value: any): value is number {
    return typeof value === 'number'
  }

  //Hàm cập nhật lại id cho những category mới thêm vào
  const UpdateIdFormData = (categories: interfaceFormData[]) => {
    console.log('>>>>>>>>>>>>categories:', categories)
    const newFormData = formData.map((item) => {
      const category = categories.find((category) => category.categoryName === item.categoryName)
      if (category) {
        return category
      }
      return item
    })
    setFormData(newFormData)
  }

  //Hàm cập nhật lại id cho những category cần update
  const UpdateIdFormDataUpdate = (categories: interfaceFormData[]) => {
    const newFormData = updateData.map((item) => {
      const category = categories.find((category) => category.categoryName === item.categoryName)
      if (category) {
        return category
      }
      return item
    })
    setUpdateData(newFormData)
  }

  const HandleClickDeleteInput = () => {
    if (isNumber(deleteData.id)) {
      http
        .delete(`category/delete`, {
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
    const isExistUpdate = updateData.some((category) => category.id === deleteData.id)
    if (isExistUpdate) {
      handleRemoveUpdateData(deleteData)
    }
  }

  //Function hiện thông báo yêu cầu xác nhận
  const handleShowModal = (category: interfaceFormData) => {
    if (RoleConstant.some((item) => item === category.categoryName)) {
      toast.error('Không thể xóa loại này!')
      return
    }
    setShowModal(true)
    setDeleteData(category)
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
      if (!item.categoryName) {
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
        .post('category/create', data)
        .then((res: any) => {
          toast.success(res.message)
          UpdateIdFormData(res.data)
          UpdateIdFormDataUpdate(res.data)
        })
        .catch((err) => {
          console.log('Error:', err)
          toast.error('Thêm mới loại phòng thất bại!')
        })
    } else {
      toast.error('Vui lòng nhập loại phòng!')
    }
  }

  const buildData = () => {
    const data = formData.map((item) => {
      return {
        categoryName: item.categoryName,
        description: item.description
      }
    })
    return data
  }

  const handleAddUpdateData = (category: interfaceFormData) => {
    if (RoleConstant.some((item) => item === category.categoryName)) {
      toast.error('Không thể cập nhật category này!')
      return
    }
    const newUpdateData = updateData.filter((item) => item.id !== category.id)
    newUpdateData.push(category)
    setUpdateData(newUpdateData)
  }

  const handleRemoveUpdateData = (category: interfaceFormData) => {
    const newUpdateData = updateData.filter((item) => item.id !== category.id)
    setUpdateData(newUpdateData)
  }

  useEffect(() => {
    if (!debouncedValue.trim()) {
      fetchData()
      return
    }
    if (debouncedValue) {
      http
        .get(`category/search`, {
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
            value={item.categoryName}
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
          {updateData.some((category) => category.id === item.id) ? (
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
      .get('categories')
      .then((res) => {
        setFormData(res.data)
      })
      .catch((err) => {
        console.log('Error:', err)
      })
  }

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
        .put('category/update', updateData)
        .then((res: any) => {
          toast.success(res.message)
          setUpdateData([])
        })
        .catch((err) => {
          console.log('Error:', err.message)
          toast.error('Cập nhật category thất bại!')
        })
    }
  }

  return (
    <>
      <div className={cx('container', 'RoomCategory_container')}>
        <button className={cx('btn', 'btn-primary')} onClick={() => navigation(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={cx('header_container')}>
          <div className={cx('create_form')}>
            <div className={cx('header_create_form', 'd-flex', 'justify-content-between')}>
              <div className={cx('d-flex', 'mb-3', 'align-items-center')}>
                <h5>Thêm mới loại phòng:</h5>
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
        notification={`Bạn có chắc chắn muốn xóa category: ${deleteData.categoryName}`}
        action='Delete'
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleClickDelete={HandleClickDeleteInput}
      />
    </>
  )
}

export default RoomCategory
