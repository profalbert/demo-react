import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import Preloader from '../common/Preloader/Preloader';
import s from './Users.module.css';
import {UserType} from '../../types/types';


type PropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	users: Array<UserType>
	followingInProgress: number[]
	unfollow: (userId: number) => void
	follow: (userId: number) => void
	isAuth: boolean
	isFetching: boolean
	authorizedUserId: number | null
}


let Users: React.FC<PropsType> = ({users, totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
	 return (
			<div className={s.usersWrapper}>
				<Paginator totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged} />

				{props.isFetching 
        ? <div className={s.usersPreloaderBlock}>
						<div className={s.usersPreloader}>
							<Preloader />
						</div>
					</div>  
        : users.map((u: UserType) =>
				  <User user={u} follow={props.follow}
								unfollow={props.unfollow}
								isAuth={props.isAuth}
								authorizedUserId={props.authorizedUserId}
								followingInProgress={props.followingInProgress}
								key={u.id}/>)
				}

			</div>
		);
}


export default Users;








