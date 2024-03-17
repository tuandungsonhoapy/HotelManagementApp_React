import Tippy from '@tippyjs/react/headless'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faMagnifyingGlass, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import styles from './Search.module.scss'
import PlotItem from '../../../components/PlotItem'
import PopperWrapper from 'components/Wrapper'
import { useDebounce } from '../../../hooks'
import { Plot } from 'types/blog.type'
import http from 'Utils/httpRequest'

const cx = classNames.bind(styles)

function Search() {
  const [searchResult, setSearchResult] = useState<Plot[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  let refInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

  const debouncedValue = useDebounce(searchValue, 500)

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      setLoading(true)
      http.get('http://localhost:8080/api/v1/blogs').then((response) => console.log(response))
      setLoading(false)
    }

    fetchApi()
  }, [debouncedValue])

  const handleClickClear = () => {
    setSearchValue('')
    setSearchResult([])
    refInput.current?.focus()
  }

  const handleClickOutside = () => {
    setShowResult(false)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const renderResult = useCallback(
    (attrs: any) => (
      <div className={cx('search-result')} tabIndex='-1' {...attrs}>
        <PopperWrapper>
          <h4 className={cx('search-title')}>Accounts</h4>
          {searchResult.map((item) => {
            return <PlotItem key={item.id} data={item} />
          })}
        </PopperWrapper>
      </div>
    ),
    [searchResult]
  )

  return (
    <div>
      <Tippy
        interactive
        visible={showResult && searchResult.length > 0}
        placement='bottom-end'
        render={renderResult}
        onClickOutside={handleClickOutside}
      >
        <div className={cx('search')}>
          <input
            placeholder='Search for information on land and blogs'
            spellCheck={false}
            onChange={handleChangeInput}
            value={searchValue}
            ref={refInput}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClickClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />}

          <button className={cx('search-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Tippy>
    </div>
  )
}

export default Search
