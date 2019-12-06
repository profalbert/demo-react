import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';


const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'auth/GET_CAPTCHA_SUCCESS';
const SET_PHOTOS_ME_SUCCESS = 'auth/SET_PHOTOS_ME_SUCCESS';

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null,
	photos: null
}

export const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_SUCCESS: {
			return {
				...state,
				...action.payload
			};
		}
		case SET_PHOTOS_ME_SUCCESS: {
			return {
				...state,
				...action.payload
			};
		}
		default: 
		  return state;
	}
}


const setAuthUserdata = (userId, email, login, isAuth, captchaUrl) => ({
 type: SET_USER_DATA, payload: {userId, email, login, isAuth, captchaUrl}
});
const getCaptchaUrlSuccess = (captchaUrl) => ({
	type: GET_CAPTCHA_SUCCESS, payload: {captchaUrl}
});
const setPhotosMeSuccess = (photos) => ({
	type: SET_PHOTOS_ME_SUCCESS, payload: {photos}
});

export const setAuthUserdataThunk = (withCredentials) => async (dispatch) =>{
	let response = await authAPI.me(withCredentials);
	if (response.data.resultCode === 0) {
		let {id, email, login} = response.data.data;
		dispatch(setAuthUserdata(id, email, login, true, null));
	}
}

export const login = (email, password, rememberMe, withCredentials, captcha) => async (dispatch) => {
	let response = await authAPI.login(email, password, rememberMe, withCredentials, captcha);
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserdataThunk(true));
	} else {
		if(response.data.resultCode === 10) {
			dispatch(getCaptchaUrlThunk());
		}
		let message = (response.data.messages.length > 0) 
			? response.data.messages[0]
			: "Some error";
		let action = stopSubmit("login", {_error: message});
		dispatch(action);
	}
}

export const logout = () => async (dispatch) => {
	let response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserdata(null, null, null, false, null));
	}
}

export const getCaptchaUrlThunk = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl();
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const setPhotosMeThunk = (myId, withCredentials = true) => async (dispatch) =>{
	let response = await authAPI.photoMe(myId, withCredentials);
	dispatch(setPhotosMeSuccess(response.data.photos));
}
