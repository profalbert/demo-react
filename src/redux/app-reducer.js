import {setAuthUserdataThunk} from './auth-reducer';


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

let initialState = {
	initialized: false
	// globalError: null
}

export const appReducer = (state = initialState, action) => {
 switch(action.type) {
 	case INITIALIZED_SUCCESS: {
	  return {
	  	...state,
	  	initialized: true
	  };
	 }
	 default: 
	  return state;
 }
}


export const initializedSuccess = () => ({
 type: INITIALIZED_SUCCESS
});

export const initializeApp = () => {
	return (dispatch) => {
		let promise = dispatch(setAuthUserdataThunk(true));
		Promise.all([promise])
		.then(() => {
      dispatch(initializedSuccess());
		});
  }
}




