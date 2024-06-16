import classNames from 'classnames/bind'
import styles from './RoomDirectory.module.scss'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'
import { toast } from 'react-toastify'
import { set } from 'lodash'
import { Link, useNavigate } from 'react-router-dom'
import configRoutes from '../../config'
import { useAppDispatch } from 'store'
import { getRoom } from 'pages/booking.slice'

const cx = classNames.bind(styles)

interface interfaceCategory {
  id: number
  categoryName: string
  description: string
}

interface interfaceOption {
  checkIn: string
  checkOut: string
  categoryId: number
}

const initialOption: interfaceOption = {
  checkIn: '',
  checkOut: '',
  categoryId: 0
}

interface interfaceRoom {
  id: number
  roomNumber: string
  status: number
  price: number
  categoryId: number
  image: string
  description: string
}

const RoomDirectory = () => {
  const [categories, setCategories] = useState<interfaceCategory[]>([])
  const [option, setOption] = useState<interfaceOption>(initialOption)
  const [rooms, setRooms] = useState<interfaceRoom[]>([])

  const disPatch = useAppDispatch()

  const handleClick = (id: number) => {
    disPatch(getRoom(id))
  }

  const renderCategories = () => {
    return categories.map((category, index) => {
      return (
        <option key={category.id} value={category.id}>
          {category.description}
        </option>
      )
    })
  }

  const handleShowRoomSelection = () => {}

  const renderRooms = () => {
    return rooms.map((room, index) => {
      return (
        <Link key={room.id} to={configRoutes.routes.booking} onClick={() => handleClick(room.id)}>
          <div className={cx('col-lg-5', 'col-12', 'room_list_item')}>
            <div className={cx('room_list_item_img_container')}>
              <img src={room.image} alt='image_test' className={cx('room_list_item_img')} />
            </div>
            <div className={cx('room_list_item_detail_container')}>
              <div className={cx('room_list_item_title')}>
                <span>Phòng {room.roomNumber}</span>
              </div>
              <div className={cx('room_list_item_detail')}>
                <span>{room.description || ''}</span>
              </div>
              <div className={cx('room_list_item_price')}>
                <span>{room.price.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        </Link>
      )
    })
  }

  useEffect(() => {
    http
      .get('categories')
      .then((res) => {
        setCategories(res.data)
        setOption({ ...option, categoryId: res.data[0].id })
      })
      .catch((err) => {
        toast.error(err.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFindEmptyRoom = () => {
    if (option.checkIn === '' || option.checkOut === '') {
      toast.error('Vui lòng chọn ngày nhận và trả phòng')
      return
    }
    if (option.checkIn >= option.checkOut) {
      toast.error('Ngày trả phòng phải lớn hơn ngày nhận phòng')
      return
    }
    if (option.checkIn < new Date().toISOString().slice(0, 16)) {
      toast.error('Ngày nhận phòng phải lớn hơn hoặc bằng ngày hiện tại')
      return
    }
    http
      .get('room/empty-by-option', { params: option })
      .then((res) => {
        setRooms(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <div>
      <div className={cx('day_selection')}>
        <div className={cx('day_selection_title_container')}>
          <div className={cx('day_selection_title_row')}>
            <span className={cx('day_selection_title')}>Khách sạn tại Đà Lạt và địa điểm lưu trú</span>
          </div>
        </div>
        <div className={cx('row', 'justify-content-center', 'day_selection_container')}>
          <div className={cx('col-lg-3', 'col-5', 'day_selection_item')}>
            <div>
              <label htmlFor='nhan_phong' className={cx('day_selection_label')}>
                Nhận phòng
              </label>
            </div>
            <div>
              <input
                onChange={(e) => setOption({ ...option, checkIn: e.target.value })}
                value={option.checkIn}
                type='datetime-local'
                name='nhan_phong'
                id='nhan_phong'
                className={cx('day_selection_input')}
              />
            </div>
          </div>
          <div className={cx('col-lg-3', 'col-5', 'day_selection_item')}>
            <div>
              <label htmlFor='tra_phong' className={cx('day_selection_label')}>
                Trả phòng
              </label>
            </div>
            <div>
              <input
                onChange={(e) => setOption({ ...option, checkOut: e.target.value })}
                value={option.checkOut}
                type='datetime-local'
                name='tra_phong'
                id='tra_phong'
                className={cx('day_selection_input')}
              />
            </div>
          </div>
          <div className={cx('col-lg-3', 'col-5', 'day_selection_item')}>
            <div>
              <label htmlFor='tra_phong' className={cx('day_selection_label')}>
                Loại phòng
              </label>
            </div>
            <div>
              <select
                value={option.categoryId}
                onChange={(e) => setOption({ ...option, categoryId: parseInt(e.target.value) })}
                className={cx('day_selection_input')}
              >
                {renderCategories()}
              </select>
            </div>
          </div>
          {/* <div className={cx('col-lg-3', 'col-10', 'day_selection_item')}>
            <div>
              <span className={cx('day_selection_label')}>Khách</span>
            </div>
            <button
              className={cx('day_selection_input', 'collapsed')}
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseRoom'
              aria-expanded='false'
            >
              <div className={cx('row', 'justify-content-between')}>
                <div className={cx('col-auto')}>
                  <div className={cx('row day_selection_info_main')}>
                    <span>
                      {clients.room} phòng, {clients.adult} người lớn, {clients.child} trẻ em
                    </span>
                  </div>
                </div>
                <div onClick={() => setShowRoomSelectionForm((prev) => !prev)} className={cx('col-auto')}>
                  <FontAwesomeIcon icon={faUserGroup} />
                </div>
              </div>
            </button>
            {showRoomSelectionForm && (
              <div className={cx('day_selection_room_collapse')}>
                <form className={cx('day_selection_room_form')} action='#'>
                  <div className={cx('row', 'justify-content-between', 'day_selection_room_form_row')}>
                    <div className={cx('col-auto', 'day_selection_room_form_label')}>
                      <label htmlFor='so_phong'>Phòng</label>
                    </div>
                    <div className={cx('col-auto', 'day_selection_room_form_number')}>
                      <ButtonReact type='decrease' onClick={handleDecreaseRoom} />
                      <input className={cx('quantity')} min={1} max={100} value={clients.room} type='number' />
                      <ButtonReact type='increase' className='plus' onClick={handleIncreaseRoom} />
                    </div>
                  </div>
                  <div className={cx('row', 'justify-content-between', 'day_selection_room_form_row')}>
                    <div className={cx('col-auto', 'day_selection_room_form_label')}>
                      <label htmlFor='so_phong'>Người lớn</label>
                    </div>
                    <div className={cx('col-auto', 'day_selection_room_form_number')}>
                      <ButtonReact type='decrease' onClick={handleDecreaseAdult} />
                      <input className={cx('quantity')} min={1} max={100} value={clients.adult} type='number' />
                      <ButtonReact type='increase' className='plus' onClick={handleIncreaseAdult} />
                    </div>
                  </div>
                  <div className={cx('row', 'justify-content-between', 'day_selection_room_form_row')}>
                    <div className={cx('col-auto', 'day_selection_room_form_label')}>
                      <label htmlFor='so_phong'>Trẻ em</label>
                    </div>
                    <div className={cx('col-auto', 'day_selection_room_form_number')}>
                      <ButtonReact type='decrease' onClick={handleDecreaseChild} />
                      <input className={cx('quantity')} min={1} max={100} value={clients.child} type='number' />
                      <ButtonReact type='increase' className='plus' onClick={handleIncreaseChild} />
                    </div>
                  </div>
                  <div className={cx('row', 'justify-content-end')}>
                    <div className={cx('col-auto')}>
                      <button className={cx('day_selection_room_form_button')}>Cập nhật</button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div> */}
        </div>
        <div className={cx('mt-3', 'd-flex', 'align-items-center', 'justify-content-center')}>
          <button onClick={handleFindEmptyRoom} className={cx('btn', 'btn-primary')}>
            Tìm phòng
          </button>
        </div>
      </div>
      <div className={cx('col-lg-10', 'col-11', 'room_list')}>
        <div className={cx('room_list_title')}>
          <span>Danh sách phòng trống</span>
        </div>
        <div className={cx('row', 'room_list_sort_container')}>
          <div className={cx('col-auto', 'room_list_sort_span')}>
            <span>Sắp xếp theo:</span>
          </div>
          <div className={cx('col-auto', 'btn-group', 'room_list_sort')}>
            <select className={cx('form-select')}>
              <option value={1} selected>
                Giá thấp đến cao
              </option>
              <option value={2}>Giá cao dến thấp</option>
            </select>
          </div>
        </div>
        <div className={cx('row', 'room_list_container')}>{renderRooms()}</div>
      </div>
    </div>
  )
}

export default RoomDirectory
