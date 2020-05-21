import {createSelector} from "reselect";
import {AppStateType} from './redux-store';


const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
}
const getUsersSelector = (state: AppStateType) => {
  return getUsers(state);
}
export const getUsersSuperSelector = 
  createSelector(getUsersSelector, (users) => {
    return users.filter(() => true);
  }); // используем библиотеку reselect, для избежания ошибок

  
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
}
export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
}



