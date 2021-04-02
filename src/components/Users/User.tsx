import React from 'react'
import s from './Users.module.css'
import iconImg from '../../assets/user.svg'
import { NavLink } from 'react-router-dom'
import { DispatchType, UserType } from '../../types/types'
import { RM } from '../../router/RouterManager'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowingInProgress, getIsAuth } from '../../redux/users-selectors'
import { follow, unfollow } from '../../redux/users-reducer'
import { AppStateType } from '../../redux/redux-store'

type PropsType = {
  user: UserType
}

export const User: React.FC<PropsType> = ({ user }) => {
  const u = user
  const noInfo = 'no information'

  const isAuth = useSelector((state: AppStateType) => getIsAuth(state))
  const authorizedUserId = useSelector(
    (state: AppStateType) => state.auth.userId,
  )
  const followingInProgress = useSelector((state: AppStateType) =>
    getFollowingInProgress(state),
  )

  const dispatch = useDispatch<DispatchType>()

  return (
    <div className={s.User}>
      <div className={s.UserImg}>
        <NavLink to={RM.profile.getUrl(u.id)}>
          <img
            className={s.userPhoto}
            src={u.photos.small != null ? u.photos.small : iconImg}
            alt='icon'
          />
        </NavLink>
      </div>

      <div className={s.UserInfo}>
        <div className={s.UserName}>{u.name}</div>
        <div className={s.UserStatus}>
          {u.status ? `"${u.status}"` : `"${noInfo}"`}
        </div>
        <div className={s.UserFollow}>
          {authorizedUserId !== u.id ? (
            u.followed ? (
              <button
                className={s.UserFollowUnfol}
                disabled={
                  !isAuth ? true : followingInProgress.some((id) => id === u.id)
                }
                onClick={() => {
                  dispatch(unfollow(u.id))
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={s.UserFollowFol}
                disabled={
                  !isAuth ? true : followingInProgress.some((id) => id === u.id)
                }
                onClick={() => {
                  dispatch(follow(u.id))
                }}
              >
                Follow
              </button>
            )
          ) : (
            <div>(It's you!)</div>
          )}
        </div>
      </div>
    </div>
  )
}
