// // Это тестовый store, он уже не нужен
// import { PostType, ProfileType } from './../types/types';
// import {profileReducer} from './profile-reducer';
// import {dialogsReducer} from './dialogs-reducer';


// let store = {
// 	_state: {
// 		profilePage: {
//       posts: [
//         {id: 1, message: 'Hi, how are you?', likesCount: 12},
//         {id: 2, message: 'It is my first post', likesCount: 22},
//         {id: 3, message: 'Good', likesCount: 14},
//         {id: 4, message: 'BB', likesCount: 16}
//       ] as Array<PostType>,
//       profile: null as ProfileType | null,
//       status: "" as string,
//       newPostText: null as string | null,
//     },
// 		dialogsPage: {
//       messagesData: [
//        {id: 1, message: 'Hi'},
//        {id: 2, message: 'How are you doing?'}, 
//        {id: 3, message: 'GG'}, 
//        {id: 4, message: 'GG'}, 
//        {id: 5, message: 'GG'}, 
//        {id: 6, message: 'GG'}
//       ] as Array<{id: number, message: string}>,
//       dialogsData: [
//        {id: 1, name: 'Dimych'},
//        {id: 2, name: 'Andrey'}, 
//        {id: 3, name: 'Sveta'}, 
//        {id: 4, name: 'Sasha'}, 
//        {id: 5, name: 'Valera'},
//        {id: 6, name: 'Albert'}
//       ] as Array<{id: number, name: string}>
//     },
// 		sidebar: {}
// 	},
// 	_callSubscriber(endPlugState: any) {
// 		console.log('hi');
// 	},

// 	getState() {
//     return this._state;
// 	},
// 	subscribe(observer: any) {
// 	  this._callSubscriber = observer;
// 	},

// 	dispatch(action: any) {
// 		this._state.profilePage = profileReducer(this._state.profilePage, action);
// 		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
// 		this._callSubscriber(this._state);
// 	}
// }


// export default store;
// // @ts-ignore
// window.store = store;





// код ниже - заглушка
// @ts-ignore
window.store = 'here should be a store from redux';




