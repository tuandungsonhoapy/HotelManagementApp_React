import classNames from 'classnames/bind'

import styles from './ServiceManagement.module.scss'
import { useEffect, useState } from 'react'
import Image from 'components/Image'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import ConfirmModal from 'components/Modal'
import RoomModal from './components/Modal'
import { RootState, useAppDispatch } from 'store'
import configRoutes from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from 'hooks'
import { useSelector } from 'react-redux'
import { setService, Service, getServices, createService, updateService } from './service.slice'

const cx = classNames.bind(styles)

const initialService: Service = {
  id: 0,
  serviceName: '',
  description: '',
  price: 0
}

const RoomManagement = () => {
  const serviceList = useSelector((state: RootState) => state.service.services)
  const service = useSelector((state: RootState) => state.service.service)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentLimit, setCurrentLimit] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<Service>(initialService)
  const [showRoomCreationModal, setShowRoomCreationModal] = useState<boolean>(false)
  const [actionRoomModal, setActionServiceModal] = useState<string>('Create')
  const [searchData, setSearchData] = useState<string>('')

  const debouncedValue = useDebounce(searchData, 700)

  const disPatch = useAppDispatch()

  //Function render danh sách tài khoản người dùng
  const RenderRooms = () => {
    const startIndex = (currentPage - 1) * currentLimit
    return (
      <>
        {serviceList.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1 + startIndex}</td>
              <td>{item.serviceName}</td>
              <td>{item.price}</td>
              <td>{item.description || ''}</td>
              <td>
                <button className={cx('btn btn-danger', 'mr-2')} onClick={() => handleShowModal(item)}>
                  Delete
                </button>
                <button className={cx('btn btn-primary')} onClick={() => handleClickUpdate(item)}>
                  Update
                </button>
              </td>
            </tr>
          )
        })}
      </>
    )
  }

  console.log('re-render')

  //Hàm lấy danh sách tài khoản người dùng
  // const fetchUserList = () => {
  //   getUserWithPagination(currentPage, currentLimit)
  //     .then((response) => {
  //       console.log('>>>>>>>>>>>>>>check response: ', response)
  //       setUsersList(response.data.users)
  //       setTotalPages(response.data.totalPages)
  //     })
  //     .catch(() => {
  //       toast.error('Lỗi không thể lấy thông tinh danh sách tài khoản người dùng!')
  //     })
  // }

  // useEffect(() => {
  //   if (!searchData) {
  //     fetchUserList()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentLimit, currentPage])

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  }

  // //Function hiện thông báo yêu cầu xác nhận
  const handleShowModal = (service: Service) => {
    setShowModal(true)
    setDataModal(service)
  }

  const handleClickUpdate = (data: Service) => {
    console.log('>>>>>>>>>>>>>data: ', data)
    setActionServiceModal('Update')
    const payload: Service = {
      ...service,
      serviceName: data.serviceName,
      description: data.description,
      price: data.price,
      id: data.id
    }
    disPatch(setService(payload))
    setShowRoomCreationModal(true)
  }

  // //Function thực hiện xóa service
  const handleClickDelete = () => {
    http
      .delete('service/delete', {
        data: {
          id: dataModal.id
        }
      })
      .then((response) => {
        if (response && response.status === 200) {
          try {
            disPatch(getServices())
            toast.success('Delete successfully!')
            setDataModal(initialService)
            setShowModal(false)
          } catch (error) {
            toast.error('Delete failed!')
          }
        }
      })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    disPatch(setService(initialService))
  }

  const handleClickCreateRoom = () => {
    setActionServiceModal('Create')
    setShowRoomCreationModal(true)
  }

  const handleHideModal = () => {
    setShowRoomCreationModal(false)
  }

  // //Function create service
  const handleCreateService = async (data: Service) => {
    let result = {}
    await disPatch(createService(data))
      .unwrap()
      .then((response: any) => {
        console.log('response from create service: ', response)
        if (response && response.status === 200 && response.code === 0) {
          try {
            disPatch(getServices())
            toast.success('Create service successfully!')
          } catch (error) {
            toast.error('Create failed')
          }
          result = {
            check: true,
            data: response.data
          }
        }
        if (response && response.status === 200 && response.code === 1) {
          toast.error(response.message)
          result = {
            check: false,
            data: response.data
          }
        }
      })
      .catch((error) => {
        toast.error('Something wrongs with server!')
        result = {
          check: false,
          data: error.data
        }
      })
    console.log('create service check >>>>>>>>>>>>:', result)
    return result
  }

  // //Function update service
  const handleUpdateService = async (data: Service) => {
    let result = {}
    await disPatch(updateService(data))
      .unwrap()
      .then((response: any) => {
        if (response && response.status === 200 && response.code === 0) {
          try {
            disPatch(getServices())
            toast.success('Update service successfully!')
          } catch (error) {
            toast.error('Update failed')
          }
          result = {
            check: true,
            data: response.data
          }
        }
        if (response && response.status === 200 && response.code === 1) {
          toast.error(response.message)
          result = {
            check: false,
            data: response.data
          }
        }
      })
      .catch((error) => {
        toast.error('Something wrongs with server!')
        result = {
          check: false,
          data: error.data
        }
      })
    return result
  }

  // //Hàm lấy danh sách tài khoản người dùng
  // const searchUserList = () => {
  //   searchUser(currentPage, currentLimit, searchData)
  //     .then((response) => {
  //       console.log('>>>>>>>>>>>>>>check response: ', response)
  //       setUsersList(response.data.users)
  //       setTotalPages(response.data.totalPages)
  //     })
  //     .catch(() => {
  //       toast.error('Lỗi không thể lấy thông tinh danh sách tài khoản người dùng!')
  //     })
  // }

  useEffect(() => {
    if (!debouncedValue.trim()) {
      disPatch(getServices())
      return
    }
    // if (debouncedValue) {
    //   searchUserList()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, currentPage, currentLimit])

  return (
    <div className={cx('page_container')}>
      <div className={cx('container', 'header_content', 'd-flex', 'justify-content-between')}>
        <div className={cx('container')}>
          <button onClick={handleClickCreateRoom} className={cx('btn btn-success mt-2 mr-3 mb-2')}>
            Thêm mới dịch vụ
          </button>
        </div>
        <div className={cx('d-flex', 'align-items-center', 'mr-4')}>
          <span>Search: </span>
          <input
            className={cx('form-control', 'input_search', 'ml-2', 'w-200')}
            type='text'
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
      <div className={cx('UserManagementPage_container')}>
        <div className={cx('container')}>
          <div className={cx('users_body')}>
            <table className={cx('table_users', 'table')}>
              <thead className={cx('table-dark')}>
                <tr>
                  <th>STT</th>
                  <th>Tên dịch vụ</th>
                  <th>Giá dịch vụ</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{RenderRooms()}</tbody>
            </table>
          </div>
          <div className={cx('service-pagination')}>
            <ReactPaginate
              nextLabel='next >'
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel='< previous'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakLabel='...'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination'
              activeClassName='active'
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <ConfirmModal
        title='Confirm delete!'
        notification={`Bạn có chắc chắn muốn xóa người dùng: ${dataModal.roomNumber}!`}
        action='Delete'
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleClickDelete}
      />
      <RoomModal
        title={actionRoomModal + ' service'}
        showModal={showRoomCreationModal}
        action={actionRoomModal}
        handleHileModal={handleHideModal}
        handleCreateService={handleCreateService}
        handleUpdateService={handleUpdateService}
      />
    </div>
  )
}

export default RoomManagement
