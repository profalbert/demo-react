import React from 'react'
import s from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import { RM } from '../../../router/RouterManager'

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={s.dialog + ' ' + s.active}>
      <NavLink activeClassName={s.active} to={RM.dialogs.getUrl(props.id)}>
        {props.name}
      </NavLink>
    </div>
  )
}

export default DialogItem
