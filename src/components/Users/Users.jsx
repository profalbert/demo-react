import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import Preloader from '../common/Preloader/Preloader';
import s from './Users.module.css';


let Users = (props) => {
	 return (
			<div className={s.usersWrapper}>
				<Paginator totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged} />

				{props.isFetching 
        ? <div className={s.usersPreloaderBlock}>
						<div className={s.usersPreloader}>
							<Preloader />
						</div>
					</div>  
        : props.users.map(u =>
				  <User user={u} follow={props.follow}
								unfollow={props.unfollow}
								isAuth={props.isAuth}
								followingInProgress={props.followingInProgress}
								key={u.id}/>)
				}

			</div>
		);
}


export default Users;








