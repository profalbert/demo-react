import React from 'react'
import s from './Preloader.module.css'
import preloader from '../../../assets/preloader.svg'

type PropsType = {}

const Preloader: React.FC<PropsType> = (props) => {
  return (
    <div className={s.loader}>
      <img src={preloader} alt='preloader' />
    </div>
  )
}

export default Preloader
