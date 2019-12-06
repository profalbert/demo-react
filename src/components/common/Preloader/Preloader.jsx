import React from 'react';
import s from './Preloader.module.css';
import preloader from '../../../assets/preloader.svg';

let Preloader = (props) => {
	return (
    <div className={s.loader}>
      <img src={preloader} alt="preloader"/>
    </div>
	);
}


export default Preloader;