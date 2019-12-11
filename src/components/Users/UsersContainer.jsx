import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {follow, unfollow,
  setCurrentPage, toggleFollowingProgress, 
  requestUsers} from '../../redux/users-reducer'; 
import {getUsersSuperSelector,
  getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching,
  getFollowingInProgress, getIsAuth} from '../../redux/users-selectors'; 
import {compose} from 'redux';


class UsersAPIComponent extends React.Component { 
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize, true);
  }

  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize, true);
  }

	render(){
    return (
      <>
        {<Users  totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  isAuth={this.props.isAuth}
                  isFetching={this.props.isFetching }
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  authorizedUserId={this.props.authorizedUserId}
                  toggleFollowingProgress={this.props.toggleFollowingProgress}
                  followingInProgress={this.props.followingInProgress}/>}
      </>
    );
	}
}


let mapStateToProps = (state) => {
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
let mapDispatchToProps = {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
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

/*Сократили код с диспачами, если одинаковое название, то можно
сократить до одного слова (flow: flow = flow),

Функция mapDispatchToProps разрастается. 
По факту мы в колбэках что делаем? принимаем параметр, 
делегируем его экшен-криейтору и дальше полученный экшен диспатчим!

Так вот, если оно так, то можно сократить код, 
передавая вторым параметром в функцию 
connect не функцию mapDispatchToProps, а передавая просто объект, 
состоящий из экшенКриейторов! как-то так))*/



const UsersContainer = compose(
	connect(mapStateToProps, mapDispatchToProps)
)(UsersAPIComponent)


export default UsersContainer;







