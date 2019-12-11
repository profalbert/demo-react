import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {toggleIsFetching} from './users-reducer';
import {setPhotosMeThunk} from './auth-reducer';


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
	posts: [
  {id: 1, message: 'Hi, how are you?', likesCount: 12},
  {id: 2, message: 'It is my first post', likesCount: 22},
  {id: 3, message: 'Good', likesCount: 14},
  {id: 4, message: 'BB', likesCount: 16}
	],
	profile: null,
	status: ""
}		  
			
export const profileReducer = (state = initialState, action) => {
 switch(action.type) {
 	case ADD_POST: {
	  let newPost = {
	   id: state.posts.length + 1,
	   message: action.newPostText,
	   likesCount: 0
	  }
	  return {
	  	...state,
	  	posts: [...state.posts, newPost],
	  	newPostText: ''
	  };
	 }
	 case SET_USER_PROFILE: {
	  return {
	  	...state,
	  	profile: action.profile
	  }; 
	 }
	 case SET_STATUS: {
	  return {
	  	...state,
	  	status: action.status
	  }; 
	 }
	 case DELETE_POST: {
	  return {
	  	...state,
	  	posts: state.posts.filter(p => p.id !== action.postId)
	  }; 
	 }
	 case SAVE_PHOTO_SUCCESS: {
	  return {
			...state,
			profile: {...state.profile, photos: action.photos}
	  }; 
	 }
	 default: 
	  return state;
 }
}


export const addPostActionCreator = (newPostText) => ({
 type: ADD_POST, newPostText
});
export const setUserProfile = (profile) => ({ 
	type: SET_USER_PROFILE, profile 
});
const setStatus = (status) => ({ 
	type: SET_STATUS, status 
});
export const deletePost = (postId) => ({ // используется для теста в PR	
	type: DELETE_POST, postId 
});
export const savePhotoSuccess = (photos) => ({ 
	type: SAVE_PHOTO_SUCCESS, photos 
});


export const setUserProfileThunk = (userId) => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	let response = await profileAPI.getProfile(userId)
	.catch((response)=>{
		dispatch(setUserProfile(response.data));
		 dispatch(toggleIsFetching(false));
		return Promise.reject(response.response.data.message);
	});
	dispatch(setUserProfile(response.data));
	dispatch(toggleIsFetching(false));
}

export const getStatusThunk = (userId) => async (dispatch) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));
}

export const updateStatusThunk = (status) => async (dispatch) => {
	try {
		let response = await profileAPI.updateStatus(status);
		if(response.data.resultCode === 0) {
			dispatch(setStatus(status));
		} else {
			return Promise.reject(response.data.messages[0]);
		}
	} catch (error) {
		console.log(error);
	}
}

export const savePhotoThunk = (file, myId) => async (dispatch) => {
	let response = await profileAPI.savePhoto(file);
	if(response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
		dispatch(setPhotosMeThunk(myId, true));
	}
}

export const saveProfileThunk = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	let response = await profileAPI.saveProfile(profile);
	if(response.data.resultCode === 0) {
		dispatch(setUserProfileThunk(userId));
	} else {
		// let action = stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0]}}); // выводит ошибку у конкретного поля
		let action = stopSubmit("edit-profile", {_error: "Error! Please check the entered data!"});
		dispatch(action);
		return Promise.reject(response.data.messages[0]);
	}
}
