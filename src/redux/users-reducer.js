import {usersAPI} from '../api/api';
import {updateObjectArray} from '../utils/object-helpers';


const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
  followingInProgress: []
}

export const usersReducer = (state = initialState, action) => {
 switch(action.type) {
 	case FOLLOW: {
		return {
			...state,
			users: updateObjectArray(state.users, action.userId, "id", {followed: true})
		};
	 }
	 case UNFOLLOW: {
	  return {
			...state,
			users: updateObjectArray(state.users, action.userId, "id", {followed: false})
		}
	 }
	 case SET_USERS: {
	  return {
	  	...state,
	  	users: action.users
	  };
	 }
	 case SET_CURRENT_PAGE: {
	  return {
	  	...state,
	  	currentPage: action.currentPage
	  };
	 }
	 case SET_TOTAL_USERS_COUNT: {
	  return {
	  	...state,
	  	totalUsersCount: action.count
	  };
	 }
	 case TOGGLE_IS_FETCHING: {
	  return {
	  	...state,
	  	isFetching: action.isFetching
	  };
	 }
	 case TOGGLE_IS_FOLLOWING_PROGRESS: {
	  return {
	  	...state,
			followingInProgress: action.followingInProgress 
			? [...state.followingInProgress, action.userId] 
			: [state.followingInProgress.filter(id => id !== action.userId)]
	  };
	 }
	 default: 
	  return state;
 }
}


const followSuccess = (userId) => ({
 type: FOLLOW, userId 
});
const unfollowSuccess = (userId) => ({ 
	type: UNFOLLOW, userId
});
const setUsers = (users) => ({ 
	type: SET_USERS, users
});
export const setCurrentPage = (currentPage) => ({ 
	type: SET_CURRENT_PAGE, currentPage
});
export const setTotalUsersCount = (totalUsersCount) => ({
	type: SET_TOTAL_USERS_COUNT, count: totalUsersCount
});
export const toggleIsFetching = (isFetching) => ({ 
	type: TOGGLE_IS_FETCHING, isFetching
});
export const toggleFollowingProgress = (followingInProgress, userId) => ({ 
	type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId
});


export const requestUsers = (page, pageSize, tf) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	dispatch(setCurrentPage(page));
	let data = await usersAPI.getUsers(page, pageSize, tf);
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
	dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if(response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
		dispatch(toggleFollowingProgress(false, userId));
	}
}

export const follow = (userId) => async (dispatch) => {
	followUnfollowFlow(dispatch, userId, 
		usersAPI.follow.bind(usersAPI), followSuccess);
}

export const unfollow = (userId) => async (dispatch) => {
	followUnfollowFlow(dispatch, userId, 
		usersAPI.unfollow.bind(usersAPI), unfollowSuccess);	
}


