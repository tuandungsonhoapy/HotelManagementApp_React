import classNames from 'classnames/bind'
import styles from './HomePage.module.scss'
import Search from 'layouts/components/Search'
import configRoutes from '../../config'
import { Link } from 'react-router-dom'
import RealEstateItem from './components/RealEstateItem'
import { useEffect, useState } from 'react'
import http from 'Utils/httpRequest'

const cx = classNames.bind(styles)

export interface interfaceRoom_HomePage {
  id: number
  roomNumber: string
  status: number
  price: number
  categoryId: number
  image: string
  description: string | null
  Category: {
    id: number
    categoryName: string
    description: string
  }
}

function HomePage(props: any) {
  const [singleRoomsList, setSingleRoomsList] = useState<interfaceRoom_HomePage[]>([])
  const [doubleRoomsList, setDoubleRoomsList] = useState<interfaceRoom_HomePage[]>([])
  const [coupleRoomsList, setCoupleRoomsList] = useState<interfaceRoom_HomePage[]>([])

  useEffect(() => {
    http.get('/room/empty-by-category', { params: { categoryId: 1 } }).then((response) => {
      setSingleRoomsList(response.data)
    })
    http.get('/room/empty-by-category', { params: { categoryId: 5 } }).then((response) => {
      setDoubleRoomsList(response.data)
    })
    http.get('/room/empty-by-category', { params: { categoryId: 6 } }).then((response) => {
      setCoupleRoomsList(response.data)
    })
  }, [])

  const renderSingleRooms = () => {
    return (
      <>
        {singleRoomsList.map((item) => {
          return <RealEstateItem key={item.id} room={item} />
        })}
      </>
    )
  }

  const renderDoubleRooms = () => {
    return (
      <>
        {doubleRoomsList.map((item) => {
          return <RealEstateItem key={item.id} room={item} />
        })}
      </>
    )
  }

  const renderCoupleRooms = () => {
    return (
      <>
        {coupleRoomsList.map((item) => {
          return <RealEstateItem key={item.id} room={item} />
        })}
      </>
    )
  }

  return (
    <div className={cx('homePage_container')}>
      <div className={cx('desktop')}>
        <div className={cx('mg-1170-container', 'ng-scope')}>
          <h1 className={cx('title')}>An tâm chọn, An tâm mua</h1>
          <div className={cx('search-bar')}>
            <ul className={cx('options-list')}>
              <li>Mua</li>
              <li>Thuê</li>
            </ul>
            <div className={cx('search_container')}>
              <Search />
            </div>
          </div>
        </div>
      </div>
      <div className={cx('homePage_content')}>
        <div style={{ paddingLeft: '60px' }} className={cx('mg-1170-container', 'container')}>
          <div className={cx('news_list', 'list-items')}>
            <h2 className={cx('title')}>Tin tức bất động sản</h2>
            <div className={cx('property-items')}>
              <div className={cx('top-news')}>
                <div className={cx('highlight-news-items')}>
                  <Link to={configRoutes.routes.home}>
                    <div className={cx('top-highlight')}>
                      <img
                        src='https://cloud.mogi.vn/news/thumb-detail/2024/03/18/174/2bea7538731e4c65a0448d8893333a42.jpg'
                        alt='mogi'
                      />
                      <div className={cx('top-highlights')}>
                        <h3 className={cx('top-highlight-title')}>
                          Tổng Hợp Các Mẫu Thạch Cao Phòng Bếp Bền Đẹp, Chuẩn Xu Hướng
                        </h3>
                        <div className={cx('top-highlight-desc')}>
                          Mẫu thạch cao phòng bếp có tổng cộng bao nhiêu loại? Hiện nay, việc xây dựng trần phòng bếp
                          đang được nhiều gia chủ quan tâm bởi vì khu vực này đòi hỏi vật tư cần phải có độ thẩm mỹ
                          tương đối, chịu được nhiệt độ cao, dầu mỡ và hơi ẩm. Qua bài
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className={cx('secondary-highlight')}>
                    <Link to={'#'}>
                      <img
                        src='https://cloud.mogi.vn/news/thumb-detail/2024/03/18/171/f99b9df283164b578464a3e9f2089338.jpg'
                        alt='mogi'
                      />
                      <h3 className={cx('secondary-highlight-title')}>
                        Bỏ Túi 30+ Ý Tưởng Thiết Kế Mẫu Nhà Nhỏ Đẹp 30m2 Đẹp Hiện Đại
                      </h3>
                    </Link>
                  </div>
                  <div className={cx('secondary-highlight')}>
                    <Link to={'#'}>
                      <img
                        src='https://cloud.mogi.vn/news/thumb-detail/2024/03/18/171/f99b9df283164b578464a3e9f2089338.jpg'
                        alt='mogi'
                      />
                      <h3 className={cx('secondary-highlight-title')}>
                        Bỏ Túi 30+ Ý Tưởng Thiết Kế Mẫu Nhà Nhỏ Đẹp 30m2 Đẹp Hiện Đại
                      </h3>
                    </Link>
                  </div>
                </div>
                <div className={cx('recent-news')}>
                  <Link to={'#'}>
                    <h3 className={cx('recent-news-title')}>
                      {' '}
                      Giải Đáp: Có Nên Nuôi Chó Mèo Ở Phòng Trọ, Phòng Kín Hay Không?
                    </h3>
                  </Link>
                  <Link to={'#'}>
                    <h3 className={cx('recent-news-title')}>
                      Bật Mí Mẹo Chọn Máy Điều Hòa Cho Phòng Trọ Tiết Kiệm Chi Phí
                    </h3>
                  </Link>
                  <Link to={'#'}>
                    <h3 className={cx('recent-news-title')}>
                      Các Cách Chống Thấm Tường Nhà Mới Xây Cực Đơn Giản, Đảm Bảo Hiệu Quả
                    </h3>
                  </Link>
                  <Link to={'#'}>
                    <h3 className={cx('recent-news-title')}>
                      Kinh Nghiệm Chọn Gạch Lát Sân Bền, Đẹp Hiện Đại Và Chống Trơn Tốt
                    </h3>
                  </Link>
                  <Link to={'#'}>
                    <h3 className={cx('recent-news-title')}>
                      Hướng Dẫn Thủ Tục Sang Tên Sổ Đỏ Khi Mua Nhà, Mua Đất Mới Nhất
                    </h3>
                  </Link>
                  <Link to={'#'}>
                    <h3 className={cx('recent-news-title')}>
                      Chi Phí Và Bản Vẽ Thiết Kế Phòng Trọ 12m2 Có Gác Lửng Mới Nhất
                    </h3>
                  </Link>
                  <Link to={'#'}>
                    <div className={cx('viewmore-all')}>Xem tất cả</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('home_banner')}>
            <div className={cx('banner-content')}>
              <Link to={'#'}>
                <img src='https://cdn.mogi.vn/banner/2024/6_11eeca9b-ee9a-49da-b880-ec93dc903c03.png' alt='mogi' />
              </Link>
            </div>
          </div>
          {singleRoomsList.length > 0 && (
            <div className={cx('list-items', 'property-for-sale')}>
              <h2 className={cx('title')}>Phòng 1 giường đơn</h2>
              <div className={cx('property-items', 'clearfix', 'mg-scroll')}>{renderSingleRooms()}</div>
            </div>
          )}
          {doubleRoomsList.length > 0 && (
            <div className={cx('list-items', 'property-for-rent')}>
              <h2 className={cx('title')}>Phòng 2 giường đơn</h2>
              <div className={cx('property-items', 'clearfix', 'mg-scroll')}>{renderDoubleRooms()}</div>
            </div>
          )}
          {coupleRoomsList.length > 0 && (
            <div className={cx('list-items', 'property-for-rent')}>
              <h2 className={cx('title')}>Phòng 1 giường đôi</h2>
              <div className={cx('property-items', 'clearfix', 'mg-scroll')}>{renderCoupleRooms()}</div>
            </div>
          )}
        </div>
        {/* <div className={cx('features')}>
          <div className={cx('mg-1170-container')}>
            <h2 className={cx('title')}>Tiện ích từ Mogi.vn</h2>
            <div className={cx('features clearfix')}>
              <div className={cx('feature')}></div>
              <div className={cx('feature')}></div>
              <div className={cx('feature')}></div>
              <div className={cx('feature')}></div>
              <div className={cx('feature')}></div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default HomePage
