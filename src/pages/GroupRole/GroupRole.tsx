import classNames from 'classnames/bind'
import styles from './GroupRole.module.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import http from 'Utils/httpRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faRefresh, faSave } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

interface interfaceGroup {
  id: number
  groupName: string
  description: string
}

interface interfaceRole {
  id: number
  url: string
  description: string
  checked?: boolean
}

function GroupRole(props: any) {
  const [groupList, setGroupList] = useState<interfaceGroup[]>([])
  const [selectedGroup, setSelectedGroup] = useState<number>(1)
  const [rolesList, setRolesList] = useState<interfaceRole[]>([])
  const [assignRolesByGroup, setAssignRolesByGroup] = useState<interfaceRole[]>([])

  const navigation = useNavigate()

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

  const buildRoleList = (allRoles: interfaceRole[], groupRoles: interfaceRole[]) => {
    let result: interfaceRole[] = []
    allRoles.forEach((role) => {
      let isExist = groupRoles.find((item) => item.id === role.id)
      if (isExist) {
        result.push({ ...role, checked: true })
      } else {
        result.push({ ...role, checked: false })
      }
    })
    return result
  }

  const fetchRolesByGroup = () => {
    http
      .get(`role/by-group`, { params: { groupId: selectedGroup } })
      .then((response) => {
        let data = buildRoleList(rolesList, response.data.Roles)
        setAssignRolesByGroup(data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const handleChangeRole = (value: number) => {
    let data = assignRolesByGroup.map((item) => {
      if (item.id === value) {
        return { ...item, checked: !item.checked }
      }
      return item
    })
    setAssignRolesByGroup(data)
  }

  const handleRefresh = () => {
    fetchRolesByGroup()
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

  // Lấy thông tin tất cả các vai trò
  useEffect(() => {
    http
      .get('roles')
      .then((response) => {
        setRolesList(response.data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }, [])

  // Lấy thông tin các vai trò của nhóm
  useEffect(() => {
    fetchRolesByGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesList, selectedGroup])

  const renderRolesList = () => {
    return (
      <>
        {assignRolesByGroup.map((item) => {
          return (
            <div key={item.id} className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                value={item.id}
                checked={item.checked}
                onChange={() => handleChangeRole(item.id)}
              />
              <label className='form-check-label'>{item.url}</label>
            </div>
          )
        })}
      </>
    )
  }

  const handleClickSave = () => {
    let data = assignRolesByGroup.filter((item) => item.checked)
    let roleIds = data.map((item) => item.id)
    http
      .post('role/assign-role', { groupId: selectedGroup, roles: roleIds })
      .then((response: any) => {
        toast.success(response.message)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const handleClickBack = () => {
    navigation(-1)
  }

  return (
    <div className={cx('groupRole_container')}>
      <div className={cx('container', 'pt-3')}>
        <div className={cx('d-flex', 'align-items-center', 'mb-3')}>
          <button onClick={handleClickBack} className={cx('btn', 'btn-primary', 'mr-3')}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h3>Group Role:</h3>
        </div>
        <div>
          <div className={cx('col-6', 'form-group', 'mb-3')}>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(parseInt(e.target.value))}
              className={cx('form-select')}
            >
              {renderGroupList()}
            </select>
          </div>
        </div>
        <hr className={cx('mt-3', 'mb-3')} />
        <div className={cx('roles_container')}>
          <h5>Assign Roles:</h5>
          {renderRolesList()}
        </div>
        <div className={cx('group-button', 'mt-4')}>
          <button onClick={handleClickSave} className={cx('btn', 'btn-primary', 'mr-4')}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button onClick={handleRefresh} className={cx('btn', 'btn-primary')}>
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupRole
