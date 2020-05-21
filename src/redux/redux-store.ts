import {createStore, combineReducers,
 applyMiddleware, compose} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import {appReducer} from './app-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';


let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
});


type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType> // специальная функция, которая определяет тип того, что возвращается из (в данном случае из функции)


export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U} ? U : never // infer выводит переменную (запоминает ее), для дальнейшего использования


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store;
// ts-ignore - игнорирует правила ts следующей строчки

export default store;


