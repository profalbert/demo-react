import React from 'react';
import s from './Header.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import iconImg from '../../assets/user.svg';


const Header = (props) => {  
  return (
   <header className={s.header}>
     {(!props.isAuth) && <Redirect to={'/login'} />}
  
     {props.isAuth 
     ? ((!props.photosMe && <div className={s.headerPreloaderBlock}><Preloader /></div>) || <div className={s.loginBlock}>
       <NavLink className={s.headerImgIconA} to={"/profile"}> <img src={props.photosMe.small  !== null 
        ? props.photosMe.small
        : iconImg } 
        alt="header-img"/> </NavLink> 
        <div className={s.loginBlockLine}> - </div> <NavLink to={"/profile"}>{props.login}</NavLink></div>) 
     : <div></div>}     

     <div className={s.logoutBlock}>
      { props.isAuth 
          ? <div>
              <button className={s.headerButton} onClick={() => {props.logout()}}>Logout</button>
            </div>
          : <NavLink to={'/login'}>Login</NavLink>
      }
     </div>
   </header>
  );
}


export default Header;