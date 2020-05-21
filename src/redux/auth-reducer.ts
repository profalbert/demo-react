import { InferActionsTypes } from './redux-store';
import { ResultStandartCodes, ResultCodeForCaptcha } from './../api/api';
import { ThunkType, PhotosType} from './../types/types';
import {authAPI, securityAPI, setKeyApi} from '../api/api';
import {stopSubmit} from 'redux-form';


export let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false as boolean,
	captchaUrl: null as string | null,
	photos: null as PhotosType | null,
}

export const authReducer = (state = initialState, action: AuthActionsTypes): typeof initialState => {
	switch(action.type) {
		case 'auth/SET_USER_DATA': {
			return {
				...state,
				...action.payload,
			};
		}
		case 'auth/GET_CAPTCHA_SUCCESS': {
			return {
				...state,
				...action.payload,
			};
		}
		case 'auth/SET_PHOTOS_ME_SUCCESS': {
			return {
				...state,
				...action.payload,
			};
		}
		default: 
		  return state;
	}
}


export type AuthActionsTypes = InferActionsTypes<typeof authActions>

export const authActions = {
	setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null, photos: PhotosType | null) => ({
	 type: 'auth/SET_USER_DATA', payload: {userId, email, login, isAuth, captchaUrl, photos}
	} as const),
	getCaptchaUrlSuccess: (captchaUrl: string | null) => ({
		type: 'auth/GET_CAPTCHA_SUCCESS', payload: {captchaUrl}
	} as const),
	setPhotosMeSuccess: (photos: PhotosType) => ({
		type: 'auth/SET_PHOTOS_ME_SUCCESS', payload: {photos}
	} as const),
}


export const setAuthUserDataThunk = (): ThunkType => async (dispatch) =>{
	let meData = await authAPI.me();
	if (meData.resultCode === ResultStandartCodes.Success) {
		let {id, email, login} = meData.data;
		dispatch(setKeyThunk(email))
		dispatch(authActions.setAuthUserData(id, email, login, true, null, null))
		dispatch(setPhotosMeThunk(id))
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string = ''): ThunkType => async (dispatch) => {
	let loginData = await authAPI.login(email, password, rememberMe, captcha);
	if (loginData.resultCode === ResultStandartCodes.Success) {
		dispatch(setAuthUserDataThunk());
	} else {
		if(loginData.resultCode === ResultCodeForCaptcha.Captcha) {
			dispatch(getCaptchaUrlThunk());
		}
		let message = (loginData.messages.length > 0) 
			? loginData.messages[0]
			: "Some error";
		let action = stopSubmit("login", {_error: message});
		dispatch(action);
	}
}

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout();
	if (response.resultCode === ResultStandartCodes.Success) {
		dispatch(authActions.setAuthUserData(null, null, null, false, null, null));
	}
}

const getCaptchaUrlThunk = (): ThunkType => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl();
	const captchaUrl = response.url;
	dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
}

export const setPhotosMeThunk = (myId: number): ThunkType => async (dispatch) =>{
	let response = await authAPI.photoMe(myId);
	dispatch(authActions.setPhotosMeSuccess(response.photos));
}

const setKeyThunk = (email: string) => async () => {
	let API_KEY = null;
	if (email === "alb.adm.ru@gmail.com") {
		API_KEY = '2f32f390-ae96-4e22-896c-29147e6b5143';
	} else if (email === "siseros589@mailhub.pro") {
		API_KEY = 'f4f61e33-1fba-45aa-93ff-8559cf05e371';
	}
	setKeyApi(API_KEY);
}

