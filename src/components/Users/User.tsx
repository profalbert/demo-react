import React from 'react';
import s from './Users.module.css';
import iconImg from '../../assets/user.svg';
import {NavLink} from 'react-router-dom';
import { UserType } from '../../types/types';


type PropsType = {
	user: UserType
	authorizedUserId: number | null
	isAuth: boolean
	followingInProgress: number[]
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}


let User: React.FC<PropsType> = ({user, authorizedUserId, isAuth, followingInProgress, follow, unfollow}) => {
	let u = user;
	const noInfo = "no information";
	
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
						{authorizedUserId !== u.id
						? u.followed 
							? <button className={s.UserFollowUnfol} disabled={!isAuth ? true : followingInProgress.some(id => id === u.id)} 
												onClick={()=>{unfollow(u.id)}}>Unfollow
								</button>
							: <button className={s.UserFollowFol} disabled={!isAuth ? true : followingInProgress.some(id => id === u.id)} 
												onClick={()=>{follow(u.id)}}>Follow
								</button>
						: <div>(It's you!)</div>
						}
					</div>
				</div>
			</div>
		);
}

export default User;








