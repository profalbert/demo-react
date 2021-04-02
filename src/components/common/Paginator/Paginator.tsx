import React, { useState, useEffect } from 'react'
import s from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize)
  const pages: number[] = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const [portionNumber, setPortionNumber] = useState<number>(1)
  const portionCount = Math.ceil(pagesCount / portionSize)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize

  useEffect(() => {
    setPortionNumber(Math.ceil(currentPage / portionSize))
  }, [currentPage, portionSize])

  return (
    <div
      className={cn(
        s.pogination /* и через запятую можно писать классы, так будет намного удобнее с библиотекой cn*/,
      )}
    >
      {portionNumber > 1 && (
        <button
          className={s.poginatorButton}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber,
        )
        .map((p) => {
          return (
            <span
              className={cn(
                { [s.selectedPage]: currentPage === p },
                s.pageNumber,
              )}
              key={p}
              onClick={() => onPageChanged(p)}
            >
              {p}
            </span>
          )
        })}

      {portionCount > portionNumber && (
        <button
          className={s.poginatorButton}
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          NEXT
        </button>
      )}
    </div>
  )
}

export default Paginator
