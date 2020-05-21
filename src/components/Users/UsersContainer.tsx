import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {follow, unfollow, requestUsers} from '../../redux/users-reducer'; 
import {getUsersSuperSelector,
  getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching,
  getFollowingInProgress, getIsAuth} from '../../redux/users-selectors'; 
import {compose} from 'redux';
import {UserType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store'; 


type MapStatePropsType = {
  totalUsersCount: number
  pageSize: number
  isAuth: boolean
  isFetching: boolean
  currentPage: number
  users: Array<UserType>
  authorizedUserId: number | null
  followingInProgress: number[]
}
type MapDispatchPropsType = {
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  requestUsers: (page: number, pageSize: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class UsersAPIComponent extends React.Component<PropsType> { // также
  //  можно указать тип для пропсов и стейта: 
  // <PropsType, StateType>, но в нашей компоненте нет стейта, 
  // поэтому этот тип избыточен
  
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  }

	render(){
    return (
      <>
        {<Users   totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  isAuth={this.props.isAuth}
                  isFetching={this.props.isFetching }
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  authorizedUserId={this.props.authorizedUserId}                 
                  followingInProgress={this.props.followingInProgress}/>}
      </>
    );
	}
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isAuth: getIsAuth(state),
    followingInProgress: getFollowingInProgress(state),
    authorizedUserId: state.auth.userId
  }
}
let mapDispatchToProps: MapDispatchPropsType = {
  follow,
  unfollow,
  requestUsers: requestUsers
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow(userId) {
//       dispatch(followAC(userId));
//     },
//     unfollow(userId) {
//       dispatch(unfollowAC(userId));      
//     }
//   }
// }

/*Функция mapDispatchToProps разрастается. 
По факту мы в колбэках что делаем? принимаем параметр, 
делегируем его экшен-криейтору и дальше полученный экшен диспатчим!

Так вот, если оно так, то можно сократить код, 
передавая вторым параметром в функцию 
connect не функцию mapDispatchToProps, а передавая просто объект, 
состоящий из экшенКриейторов! как-то так))*/



const UsersContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps) // строгая последовательность типов!!!
)(UsersAPIComponent)


export default UsersContainer;







