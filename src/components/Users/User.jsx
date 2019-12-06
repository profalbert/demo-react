import React from 'react';
import s from './Users.module.css';
import iconImg from '../../assets/user.svg';
import {NavLink} from 'react-router-dom';


const noInfo = "no information";

let User = (props) => {
	let u = props.user;

	 return (
			<div className={s.User}>				 	
				<div className={s.UserImg}>
					<NavLink to={'/profile/' + u.id}>
							<img className={s.userPhoto} src={ u.photos.small != null 
							? u.photos.small 
							: iconImg } alt="icon"/>
					</NavLink>				 			
				</div>

				<div className={s.UserInfo}>
					<div className={s.UserName}>{u.name}</div>
					<div className={s.UserStatus}>{u.status ? `"${u.status}"` : `"${noInfo}"`}</div>
					<div className={s.UserFollow}>
						{u.followed 
							? <button className={s.UserFollowUnfol} disabled={!props.isAuth ? true : props.followingInProgress.some(id => id === u.id)} 
												onClick={()=>{props.unfollow(u.id)}}>Unfollow
								</button>
							: <button className={s.UserFollowFol} disabled={!props.isAuth ? true : props.followingInProgress.some(id => id === u.id)} 
												onClick={()=>{props.follow(u.id)}}>Follow
								</button>
						}
					</div>
				</div>
			</div>
		);
}

export default User;








