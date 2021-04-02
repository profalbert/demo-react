import React, { useEffect } from 'react'
import Paginator from '../common/Paginator/Paginator'
import { User } from './User'
import Preloader from '../common/Preloader/Preloader'
import s from './Users.module.css'
import { UserType } from '../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getUsersSuperSelector,
  getIsFetching,
} from '../../redux/users-selectors'
import { requestUsers } from '../../redux/users-reducer'
import { AppStateType } from '../../redux/redux-store'
import { DispatchType } from '../../types/types'

type PropsType = {}

const Users: React.FC<PropsType> = () => {
  const isFetching = useSelector((state: AppStateType) => getIsFetching(state))
  const pageSize = useSelector((state: AppStateType) => getPageSize(state))
  const users = useSelector((state: AppStateType) =>
    getUsersSuperSelector(state),
  )
  const totalUsersCount = useSelector((state: AppStateType) =>
    getTotalUsersCount(state),
  )
  const currentPage = useSelector((state: AppStateType) =>
    getCurrentPage(state),
  )

  const dispatch = useDispatch<DispatchType>()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize))
  }

  return (
    <div className={s.usersWrapper}>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />

      {isFetching ? (
        <div className={s.usersPreloaderBlock}>
          <div className={s.usersPreloader}>
            <Preloader />
          </div>
        </div>
      ) : (
        users.map((u: UserType) => <User key={u.id} user={u} />)
      )}
    </div>
  )
}

export default Users
