import classNames from 'classnames/bind'

import styles from './UserManagementPage.module.scss'
import { useEffect, useState } from 'react'
import Image from 'components/Image'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { createUser, getUserWithPagination, updateUser } from 'services/authService'
import ConfirmModal from 'components/Modal'
import UserModal from 'components/UserModal/UserModal'
import { interfaceRegister } from 'types/auth.type'
import { useAppDispatch } from 'store'
import { setShowUpdateUser } from 'pages/auth.slice'
import { defaultFormRegister } from 'constants/register'

const initialUser: interfaceUser = {
  id: 0,
  firstName: '',
  lastName: '',
  username: '',
  phone: '',
  avatar: null,
  groupId: 1,
  Group: null
}

interface interfaceUser {
  id?: number
  firstName: string
  lastName: string
  username: string
  password?: string
  phone: string
  avatar?: string | null | undefined
  groupId: number
  Group?:
    | {
        id: number
        groupName: string
        description: string
      }
    | null
    | undefined
}

const cx = classNames.bind(styles)

const UserManagementPage = () => {
  const [usersList, setUsersList] = useState<interfaceUser[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentLimit, setCurrentLimit] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<interfaceUser>(initialUser)
  const [showUserCreationModal, setShowUserCreationModal] = useState<boolean>(false)
  const [actionUserModal, setActionUserModal] = useState<string>('Create')

  const disPatch = useAppDispatch()

  //Function render danh sách tài khoản người dùng
  const RenderUsers = () => {
    const startIndex = (currentPage - 1) * currentLimit
    return (
      <>
        {usersList.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1 + startIndex}</td>
              <td>{item.firstName + ' ' + item.lastName}</td>
              <td>{item.username}</td>
              <td>{item.phone}</td>
              <td>{item.Group?.groupName || 'Không có vài trò'}</td>
              <td>
                <Image className={cx('user-avatar')} src={item.avatar} />
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

  const handleClickUpdate = (data: interfaceUser) => {
    console.log('>>>>>>>>>>>>>data: ', data)
    setActionUserModal('Update')
    const payload: interfaceRegister = {
      ...defaultFormRegister,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      phone: data.phone,
      groupId: data.groupId,
      id: data.id
    }
    disPatch(setShowUpdateUser(payload))
    setShowUserCreationModal(true)
  }

  console.log('re-render')

  //Hàm lấy danh sách tài khoản người dùng
  const fetchUserList = () => {
    getUserWithPagination(currentPage, currentLimit)
      .then((response) => {
        console.log(response)
        setUsersList(response.data.data.users)
        setTotalPages(response.data.data.totalPages)
      })
      .catch((error) => {
        toast.error('Lỗi không thể lấy thông tinh danh sách tài khoản người dùng!')
      })
  }

  useEffect(() => {
    fetchUserList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLimit, currentPage])

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  }

  //Function hiện thông báo yêu cầu xác nhận
  const handleShowModal = (user: interfaceUser) => {
    setShowModal(true)
    setDataModal(user)
  }

  //Function thực hiện xóa user
  const handleClickDelete = () => {
    http
      .delete('user/delete', {
        data: {
          id: dataModal.id
        }
      })
      .then((response) => {
        if (response && response.data.status === 200) {
          try {
            fetchUserList()
            toast.success('Delete successfully!')
            setDataModal(initialUser)
            setShowModal(false)
          } catch (error) {
            toast.error('Delete failed!')
          }
        }
      })
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setDataModal(initialUser)
  }

  const handleClickCreateUser = () => {
    setActionUserModal('Create')
    setShowUserCreationModal(true)
  }

  const handleHideModal = () => {
    setShowUserCreationModal(false)
  }

  //Function create user
  const handleCreateUser = async (data: interfaceRegister) => {
    const result = await createUser(data).then((response: any) => {
      if (response && response.data.status === 200 && response.data.code === 0) {
        try {
          fetchUserList()
          toast.success('Create user successfully!')
        } catch (error) {
          toast.error('Create failed')
        }
        return {
          check: true,
          data: response.data.data
        }
      }
      if (response && response.data.status === 200 && response.data.code === 1) {
        toast.error(response.data.message)
        return {
          check: false,
          data: response.data.data
        }
      }
    })
    console.log(result)
    return result
  }

  //Function update user
  const handleUpdateUser = async (data: interfaceRegister) => {
    const result = await updateUser(data).then((response) => {
      if (response && response.data.status === 200 && response.data.code === 0) {
        try {
          fetchUserList()
          toast.success('Update user successfully!')
        } catch (error) {
          toast.error('Update failed')
        }
        return {
          check: true,
          data: response.data.data
        }
      }
      if (response && response.data.status === 200 && response.data.code === 1) {
        toast.error(response.data.message)
        return {
          check: false,
          data: response.data.data
        }
      }
      toast.error('Something wrongs with server!')
      return {
        check: false,
        data: 'Somthing wrongs with server'
      }
    })
    return result
  }

  return (
    <>
      <div className={cx('header_content')}>
        <div className={cx('container')}>
          <button onClick={handleClickCreateUser} className={cx('btn btn-primary mt-2 mb-2')}>
            Create new user
          </button>
        </div>
      </div>
      <div className={cx('UserManagementPage_container')}>
        <div className={cx('container')}>
          <div className={cx('users_body')}>
            <table className={cx('table_users', 'table')}>
              <thead className={cx('table-dark')}>
                <tr>
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Vai trò</th>
                  <th>Avatar</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{RenderUsers()}</tbody>
            </table>
          </div>
          <div className={cx('user-pagination')}>
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
        notification={`Bạn có chắc chắn muốn xóa người dùng: ${dataModal.username}!`}
        action='Delete'
        show={showModal}
        handleCloseModal={handleCloseModal}
        handleClickDelete={handleClickDelete}
      />
      <UserModal
        title={actionUserModal + ' user'}
        showModal={showUserCreationModal}
        action={actionUserModal}
        handleHileModal={handleHideModal}
        handleCreateUser={handleCreateUser}
        handleUpdateUser={handleUpdateUser}
      />
    </>
  )
}

export default UserManagementPage
