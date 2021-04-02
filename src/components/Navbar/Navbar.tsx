import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { RM } from '../../router/RouterManager'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li className={`${s.item}`}>
          <NavLink activeClassName={s.active} to={RM.profile.path}>
            Profile
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink activeClassName={s.active} to={RM.dialogs.path}>
            Messages
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink activeClassName={s.active} to={RM.users.path}>
            Users
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink activeClassName={s.active} to={RM.news.path}>
            News
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink activeClassName={s.active} to={RM.music.path}>
            Music
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink activeClassName={s.active} to={RM.settings.path}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
