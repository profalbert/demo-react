// import {profileReducer} from './profile-reducer';
// import {dialogsReducer} from './dialogs-reducer';
// import {sidebarReducer} from './sidebar-reducer';


// let store = {
// 	_state: {
// 		profilePage: {
// 			posts: [
// 		  {id: 1, message: 'Hi, how are you?', likesCount: 12},
// 		  {id: 2, message: 'It is my first post', likesCount: 22},
// 		  {id: 3, message: 'Good', likesCount: 14},
// 		  {id: 4, message: 'BB', likesCount: 16}
// 			],
// 			newPostText: 'it-kama'
// 		},
// 		dialogsPage: {
// 			messagesData: [
// 			 {id: 1, message: 'Hi'},
// 			 {id: 2, message: 'How are you doing?'}, 
// 			 {id: 3, message: 'GG'}, 
// 			 {id: 4, message: 'GG'}, 
// 			 {id: 5, message: 'GG'}, 
// 			 {id: 6, message: 'GG'}
// 			],
// 			dialogsData: [
// 			 {id: 1, name: 'Dimych'},
// 			 {id: 2, name: 'Andrey'}, 
// 			 {id: 3, name: 'Sveta'}, 
// 			 {id: 4, name: 'Sasha'}, 
// 			 {id: 5, name: 'Valera'}, 
// 			 {id: 6, name: 'Albert'}
// 			],
// 			newMessageBody: ""
// 		},
// 		sidebar: {}
// 	},
// 	_callSubscriber() {
// 		console.log('hi');
// 	},

// 	getState() {
//     return this._state;
// 	},
// 	subscribe(observer) {
// 	  this._callSubscriber = observer;
// 	},

// 	dispatch(action) { // { action - объект; type: 'ADD-POST' }
// 		this._state.profilePage = profileReducer(this._state.profilePage, action);
// 		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
// 		this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);
// 		this._callSubscriber(this._state);
// 	}
// }




// export default store;
// window.store = store;























