import { InferActionsTypes } from './redux-store';
import { ResultStandartCodes } from './../api/api';
import { ThunkType } from './../types/types';
import {profileAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {usersActions} from './users-reducer'; // загружает весь бандл, или только одну штуку (здесь используем лишь одну)?
import {setPhotosMeThunk} from './auth-reducer';
import {PostType, ProfileType, PhotosType} from '../types/types';


let initialState = {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It is my first post', likesCount: 22},
		{id: 3, message: 'Good', likesCount: 14},
		{id: 4, message: 'BB', likesCount: 16}
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: "" as string,
	newPostText: null as string | null,
}		  
			
export const profileReducer = (state = initialState, action: ProfileActionsTypes): typeof initialState => {
 switch(action.type) {
 	case 'profile/ADD_POST': {
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
	 case 'profile/SET_USER_PROFILE': {
	  return {
	  	...state,
	  	profile: action.profile
	  }; 
	 }
	 case 'profile/SET_STATUS': {
	  return {
	  	...state,
	  	status: action.status
	  }; 
	 }
	 case 'profile/DELETE_POST': {
	  return {
	  	...state,
	  	posts: state.posts.filter((p: PostType) => p.id !== action.postId)
	  }; 
	 }
	 case 'profile/SAVE_PHOTO_SUCCESS': {
	  return {
			...state,
			profile: {...state.profile, photos: action.photos} as ProfileType
	  }; 
	 }
	 default: 
	  return state;
 }
}


export type ProfileActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
	setUserProfile: (profile: ProfileType) => ({ 
		type: 'profile/SET_USER_PROFILE', profile 
	} as const),
	setStatus: (status: string) => ({ 
		type: 'profile/SET_STATUS', status 
	} as const),
	savePhotoSuccess: (photos: PhotosType) => ({ 
		type: 'profile/SAVE_PHOTO_SUCCESS', photos 
	} as const),
	addPostActionCreator: (newPostText: string) => ({
		type: 'profile/ADD_POST', newPostText
	} as const),
	deletePost: (postId: number) => ({ // используется для теста в PR	
		type: 'profile/DELETE_POST', postId 
	} as const),
}


export const setUserProfileThunk = (userId: number): ThunkType => async (dispatch) => {
	dispatch(usersActions.toggleIsFetching(true));
	try {
		let profile = await profileAPI.getProfile(userId)
		dispatch(profileActions.setUserProfile(profile));
		dispatch(usersActions.toggleIsFetching(false));
	} catch (error) {
		dispatch(usersActions.toggleIsFetching(false));
		return Promise.reject(error);
	}	
}

export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
	try {
		let status = await profileAPI.getStatus(userId);
		status && dispatch(profileActions.setStatus(status));
	} catch (error) {
		return Promise.reject(error);
	}
}

export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
	try {
		let response = await profileAPI.updateStatus(status);
		if(response.resultCode === ResultStandartCodes.Success) {
			dispatch(profileActions.setStatus(status));
		} else {
			return Promise.reject(response.messages[0]);
		}
	} catch (error) {
		return Promise.reject(error);
	}
}

export const savePhotoThunk = (photoFile: File, myId: number): ThunkType => async (dispatch) => {
	let response = await profileAPI.savePhoto(photoFile);
	if(response.resultCode === ResultStandartCodes.Success) {
		dispatch(profileActions.savePhotoSuccess(response.data.photos));
		dispatch(setPhotosMeThunk(myId));
	}
}

export const saveProfileThunk = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	let response = await profileAPI.saveProfile(profile);
	if(response.resultCode === ResultStandartCodes.Success) {
		userId && dispatch(setUserProfileThunk(userId));
	} else {
		// let action = stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0]}}); // выводит ошибку у конкретного поля
		let action = stopSubmit("edit-profile", {_error: "Error! Please check the entered data!"});
		dispatch(action);
		return Promise.reject(response.messages[0]);
	}
}

