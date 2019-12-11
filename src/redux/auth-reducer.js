import {authAPI, securityAPI, setApiKeyApi} from '../api/api';
import {stopSubmit} from 'redux-form';


const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'auth/GET_CAPTCHA_SUCCESS';
const SET_PHOTOS_ME_SUCCESS = 'auth/SET_PHOTOS_ME_SUCCESS';
// const SET_APIKEY_SUCCESS = 'auth/SET_APIKEY_SUCCESS';

export let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null,
	photos: null,
	API_KEY: null
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
		// case SET_APIKEY_SUCCESS: {
		// 	return {
		// 		...state,
		// 		...action.payload
		// 	};
		// }
		default: 
		  return state;
	}
}


const setAuthUserdata = (userId, email, login, isAuth, captchaUrl, photos) => ({
 type: SET_USER_DATA, payload: {userId, email, login, isAuth, captchaUrl, photos}
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
		dispatch(setApiKeyThunk(email))
		.then(
			dispatch(setAuthUserdata(id, email, login, true, null)),
			dispatch(setPhotosMeThunk(id, true))
		);
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
		dispatch(setAuthUserdata(null, null, null, false, null, null));
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

export const setApiKeyThunk = (email) => async (dispatch) =>{
	let API_KEY = null;
	if  (email === "alb.adm.ru@gmail.com") {
		API_KEY = '2f32f390-ae96-4e22-896c-29147e6b5143';
	} else if (email === "siseros589@mailhub.pro") {
		API_KEY = 'f4f61e33-1fba-45aa-93ff-8559cf05e371';
	}
	setApiKeyApi(API_KEY);
}
