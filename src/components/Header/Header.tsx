import React from 'react'
import s from './Header.module.css'
import { NavLink, Redirect } from 'react-router-dom'
import Preloader from '../common/Preloader/Preloader'
import iconImg from '../../assets/user.svg'
import { PhotosType } from '../../types/types'
import { RM } from '../../router/RouterManager'

type PropsType = {
  isAuth: boolean
  login: string | null
  photosMe: PhotosType | null
  logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={s.header}>
      {!props.isAuth && <Redirect to={RM.login.path} />}

      {props.isAuth ? (
        (!props.photosMe && (
          <div className={s.headerPreloaderBlock}>
            <Preloader />
          </div>
        )) ||
        (props.photosMe && (
          <div className={s.loginBlock}>
            <NavLink className={s.headerImgIconA} to={RM.profile.path}>
              <img src={props.photosMe.small || iconImg} alt='header-img' />
            </NavLink>
            <div className={s.loginBlockLine}> - </div>
            <NavLink to={RM.profile.path}>{props.login}</NavLink>
          </div>
        ))
      ) : (
        <div></div>
      )}

      <div className={s.logoutBlock}>
        {props.isAuth ? (
          <div>
            <button
              className={s.headerButton}
              onClick={() => {
                props.logout()
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to={RM.login.path}>Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
