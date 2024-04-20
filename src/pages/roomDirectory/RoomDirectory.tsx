import classNames from 'classnames/bind'
import styles from './RoomDirectory.module.scss'
import ButtonReact from './components/ButtonReact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const cx = classNames.bind(styles)

interface Client {
  room: number
  adult: number
  child: number
}

const initialClients: Client = {
  room: 1,
  adult: 1,
  child: 1
}

const RoomDirectory = () => {
  const [showRoomSelectionForm, setShowRoomSelectionForm] = useState<boolean>(false)
  const [clients, setClients] = useState<Client>(initialClients)

  const handleIncreaseRoom = () => {
    if (clients.room >= 100) return
    setClients((prev) => ({ ...prev, room: prev.room + 1 }))
  }

  const handleDecreaseRoom = () => {
    if (clients.room <= 1) return
    setClients((prev) => ({ ...prev, room: prev.room - 1 }))
  }

  const handleIncreaseAdult = () => {
    if (clients.adult >= 100) return
    setClients((prev) => ({ ...prev, adult: prev.adult + 1 }))
  }

  const handleDecreaseAdult = () => {
    if (clients.adult <= 1) return
    setClients((prev) => ({ ...prev, adult: prev.adult - 1 }))
  }

  const handleIncreaseChild = () => {
    if (clients.child >= 100) return
    setClients((prev) => ({ ...prev, child: prev.child + 1 }))
  }

  const handleDecreaseChild = () => {
    if (clients.child <= 1) return
    setClients((prev) => ({ ...prev, child: prev.child - 1 }))
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
              <input type='date' name='nhan_phong' id='nhan_phong' className={cx('day_selection_input')} />
            </div>
          </div>
          <div className={cx('col-lg-3', 'col-5', 'day_selection_item')}>
            <div>
              <label htmlFor='tra_phong' className={cx('day_selection_label')}>
                Trả phòng
              </label>
            </div>
            <div>
              <input type='date' name='tra_phong' id='tra_phong' className={cx('day_selection_input')} />
            </div>
          </div>
          <div className={cx('col-lg-3', 'col-10', 'day_selection_item')}>
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
          </div>
        </div>
      </div>
      <div className={cx('col-lg-10', 'col-11', 'room_list')}>
        <div className={cx('room_list_title')}>
          <span>Danh sách phòng</span>
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
              <option value={3}>Đặt nhiều nhất</option>
            </select>
          </div>
        </div>
        <div className={cx('row', 'room_list_container')}>
          <div className={cx('col-lg-5', 'col-12', 'room_list_item')}>
            <div className={cx('room_list_item_img_container')}>
              <img
                src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/78667432.jpg?k=7c525275216830e24ab2f759d093d83aed7348ac2d38a7cd8788ff3aa91ac069&o=&hp=1'
                alt='image_test'
                className={cx('room_list_item_img')}
              />
            </div>
            <div className={cx('room_list_item_detail_container')}>
              <div className={cx('room_list_item_title')}>
                <span>Goldient Boutique Hotel</span>
              </div>
              <div className={cx('room_list_item_detail')}>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, fuga.</span>
              </div>
              <div className={cx('room_list_item_price')}>
                <span>1.000.000</span>
              </div>
            </div>
          </div>
          <div className={cx('col-lg-5', 'col-12', 'room_list_item')}>
            <div className={cx('room_list_item_img_container')}>
              <img
                alt='img_test'
                className={cx('room_list_item_img')}
                src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/78667432.jpg?k=7c525275216830e24ab2f759d093d83aed7348ac2d38a7cd8788ff3aa91ac069&o=&hp=1'
              />
            </div>
            <div className={cx('room_list_item_detail_container')}>
              <div className={cx('room_list_item_title')}>
                <span>Goldient Boutique Hotel</span>
              </div>
              <div className={cx('room_list_item_detail')}>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, fuga.</span>
              </div>
              <div className={cx('room_list_item_price')}>
                <span>1.000.000</span>
              </div>
            </div>
          </div>
          <div className={cx('col-lg-5', 'col-12', 'room_list_item')}>
            <div className={cx('room_list_item_img_container')}>
              <img
                alt='img'
                className={cx('room_list_item_img')}
                src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/78667432.jpg?k=7c525275216830e24ab2f759d093d83aed7348ac2d38a7cd8788ff3aa91ac069&o=&hp=1'
              />
            </div>
            <div className={cx('room_list_item_detail_container')}>
              <div className={cx('room_list_item_title')}>
                <span>Goldient Boutique Hotel</span>
              </div>
              <div className={cx('room_list_item_detail')}>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, fuga.</span>
              </div>
              <div className={cx('room_list_item_price')}>
                <span>1.000.000</span>
              </div>
            </div>
          </div>
          <div className={cx('col-lg-5', 'col-12', 'room_list_item')}>
            <div className={cx('room_list_item_img_container')}>
              <img
                alt='img'
                className={cx('room_list_item_img')}
                src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/78667432.jpg?k=7c525275216830e24ab2f759d093d83aed7348ac2d38a7cd8788ff3aa91ac069&o=&hp=1'
              />
            </div>
            <div className={cx('room_list_item_detail_container')}>
              <div className={cx('room_list_item_title')}>
                <span>Goldient Boutique Hotel</span>
              </div>
              <div className={cx('room_list_item_detail')}>
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, fuga.</span>
              </div>
              <div className={cx('room_list_item_price')}>
                <span>1.000.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDirectory
