import {createSelector} from "reselect";


const getUsers = (state) => {
  return state.usersPage.users;
}
const getUsersSelector = (state) => {
  return getUsers(state);
}
export const getUsersSuperSelector = 
  createSelector(getUsersSelector, (users) => {
    return users.filter(() => true);
  }); // используем библиотеку reselect, для избежания ошибок

  
export const getPageSize = (state) => {
  return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
  return state.usersPage.followingInProgress;
}
export const getIsAuth = (state) => {
  return state.auth.isAuth;
}












