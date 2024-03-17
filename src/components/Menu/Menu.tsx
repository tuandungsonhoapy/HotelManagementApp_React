import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'

import PopperWrapper from '../Wrapper'
import styles from './Menu.module.scss'
import MenuItem from '../MenuItem'
import Header from './Header'
import { useState } from 'react'

const cx = classNames.bind(styles)

interface menuProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined
  MENU?: any
  hideOnClick?: boolean
  onChange?: Function
}

function Menu({ children, MENU, hideOnClick = false, onChange }: menuProps) {
  const [history, setHistory] = useState([{ data: MENU }])

  const getMenuAndTitle = () => {
    const currentHistory: any = history[history.length - 1]
    return {
      menu: currentHistory.data,
      title: currentHistory.title
    }
  }

  const { menu, title }: { menu: any; title: any } = getMenuAndTitle()

  const handleClickMenuItem = (item: any) => {
    if (item.children) {
      setHistory([...history, item.children])
      console.log('>>> change menu:', [...history, item.children])
    } else {
      if (onChange) {
        onChange(item)
      }
    }
  }

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1))
  }

  const renderMenuItems = () => {
    return (
      <ul className={cx('box_menu')}>
        {menu.map((item: any, index: number) => {
          return <MenuItem item={item} key={index} onClick={handleClickMenuItem} />
        })}
      </ul>
    )
  }

  const renderResult = (attrs: any) => (
    <div className={cx('content')} tabIndex='-1' {...attrs}>
      <PopperWrapper>
        {title && title.length > 0 && <Header title={title} onBack={handleBack} />}
        <div className={cx('menu-body')}>{renderMenuItems()}</div>
      </PopperWrapper>
    </div>
  )

  const handleResetMenu = () => {
    setHistory((prev) => prev.slice(0, 1))
  }

  return (
    <Tippy
      delay={[0, 400]}
      // visible
      offset={[12, 10]}
      interactive
      placement='bottom-end'
      hideOnClick={hideOnClick}
      render={renderResult}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  )
}

export default Menu
