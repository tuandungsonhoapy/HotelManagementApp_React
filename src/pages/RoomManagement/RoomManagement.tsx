import classNames from 'classnames/bind'

import styles from './RoomManagement.module.scss'
import { useEffect, useState } from 'react'
import Image from 'components/Image'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import ConfirmModal from 'components/Modal'
import RoomModal from './components/Modal'
import { RootState, useAppDispatch } from 'store'
import { Link } from 'react-router-dom'
import configRoutes from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from 'hooks'
import { useSelector } from 'react-redux'
import { createRoom, getRooms, interfaceRoom, setRoom, updateRoom } from './room.slice'
import { get, set } from 'lodash'

const cx = classNames.bind(styles)

const initialRoom: interfaceRoom = {
  id: 0,
  roomNumber: '',
  status: 0,
  price: 0,
  categoryId: 0,
  image: ''
}

const RoomManagement = () => {
  const roomsList = useSelector((state: RootState) => state.room.rooms)
  const room = useSelector((state: RootState) => state.room.room)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentLimit, setCurrentLimit] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<interfaceRoom>(initialRoom)
  const [showRoomCreationModal, setShowRoomCreationModal] = useState<boolean>(false)
  const [actionRoomModal, setActionRoomModal] = useState<string>('Create')
  const [searchData, setSearchData] = useState<string>('')

  const debouncedValue = useDebounce(searchData, 700)

  const disPatch = useAppDispatch()

  //Function render danh sách tài khoản người dùng
  const RenderRooms = () => {
    const startIndex = (currentPage - 1) * currentLimit
    return (
      <>
        {roomsList.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1 + startIndex}</td>
              <td>{item.roomNumber}</td>
              {item.status === 0 && <td>Trống</td>}
              {item.status === 1 && <td>Đang được đặt cọc</td>}
              {item.status === 2 && <td>Đã thuê</td>}
              {item.status === -1 && <td>Đang dọn dẹp</td>}
              <td>{item.price}</td>
              <td>{item.Category?.categoryName || 'Không thuộc loại phòng nào'}</td>
              <td>
                <Image className={cx('room-avatar')} src={item.image} />
              </td>
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
  const handleShowModal = (room: interfaceRoom) => {
    setShowModal(true)
    setDataModal(room)
  }

  const handleClickUpdate = (data: interfaceRoom) => {
    console.log('>>>>>>>>>>>>>data: ', data)
    setActionRoomModal('Update')
    const payload: interfaceRoom = {
      ...room,
      roomNumber: data.roomNumber,
      status: data.status,
      price: data.price,
      categoryId: data.categoryId,
      image: data.image,
      id: data.id
    }
    disPatch(setRoom(payload))
    setShowRoomCreationModal(true)
  }

  // //Function thực hiện xóa room
  const handleClickDelete = () => {
    http
      .delete('room/delete', {
        data: {
          id: dataModal.id
        }
      })
      .then((response) => {
        if (response && response.status === 200) {
          try {
            disPatch(getRooms())
            toast.success('Delete successfully!')
            setDataModal(initialRoom)
            setShowModal(false)
          } catch (error) {
            toast.error('Delete failed!')
          }
        }
      })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    disPatch(setRoom(initialRoom))
  }

  const handleClickCreateRoom = () => {
    setActionRoomModal('Create')
    setShowRoomCreationModal(true)
  }

  const handleHideModal = () => {
    setShowRoomCreationModal(false)
  }

  // //Function create room
  const handleCreateRoom = async (data: interfaceRoom) => {
    let result = {}
    await disPatch(createRoom(data))
      .unwrap()
      .then((response: any) => {
        console.log('response from create room: ', response)
        if (response && response.status === 200 && response.code === 0) {
          try {
            disPatch(getRooms())
            toast.success('Create room successfully!')
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
    console.log('create room check >>>>>>>>>>>>:', result)
    return result
  }

  // //Function update room
  const handleUpdateRoom = async (data: interfaceRoom) => {
    let result = {}
    await disPatch(updateRoom(data))
      .unwrap()
      .then((response: any) => {
        if (response && response.status === 200 && response.code === 0) {
          try {
            disPatch(getRooms())
            toast.success('Update room successfully!')
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
      disPatch(getRooms())
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
            Thêm mới phòng <FontAwesomeIcon icon={faHouse} />
          </button>
          <Link className={cx('btn btn-primary mt-2 mb-2')} to={configRoutes.routes.roomCategory}>
            Room Category
          </Link>
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
                  <th>Tên phòng</th>
                  <th>Trạng thái</th>
                  <th>Giá phòng</th>
                  <th>Loại phòng</th>
                  <th>Ảnh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{RenderRooms()}</tbody>
            </table>
          </div>
          <div className={cx('room-pagination')}>
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
        title={actionRoomModal + ' room'}
        showModal={showRoomCreationModal}
        action={actionRoomModal}
        handleHileModal={handleHideModal}
        handleCreateRoom={handleCreateRoom}
        handleUpdateRoom={handleUpdateRoom}
      />
    </div>
  )
}

export default RoomManagement
