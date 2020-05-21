import { InferActionsTypes } from './redux-store';
import { ThunkType } from './../types/types';
import {setAuthUserDataThunk} from './auth-reducer';


let initialState = {
	initialized: false as boolean
	// globalError: null
}

export const appReducer = (state = initialState, action: AppActionsTypes): typeof initialState => {
 switch(action.type) {
 	case 'app/INITIALIZED_SUCCESS': {
	  return {
	  	...state,
			initialized: true,
	  };
	 }
	 default: 
	  return state;
 }
}


export type AppActionsTypes = InferActionsTypes<typeof appActions>

export const appActions = {
	initializedSuccess: () => ({
		type: 'app/INITIALIZED_SUCCESS'
	} as const),
}


export const initializeApp = (): ThunkType => async (dispatch) => {
	let promise = dispatch(setAuthUserDataThunk());
	await Promise.all([promise])
	dispatch(appActions.initializedSuccess());
}

