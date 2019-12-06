const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

let initialState = {
	messagesData: [
	 {id: 1, message: 'Hi'},
	 {id: 2, message: 'How are you doing?'}, 
	 {id: 3, message: 'GG'}, 
	 {id: 4, message: 'GG'}, 
	 {id: 5, message: 'GG'}, 
	 {id: 6, message: 'GG'}
	],
	dialogsData: [
	 {id: 1, name: 'Dimych'},
	 {id: 2, name: 'Andrey'}, 
	 {id: 3, name: 'Sveta'}, 
	 {id: 4, name: 'Sasha'}, 
	 {id: 5, name: 'Valera'}, 
	 {id: 6, name: 'Albert'}
	]
}

export const dialogsReducer = (state = initialState, action) => {
 switch(action.type) {
	 case SEND_MESSAGE: 
		let body = action.newMessageBody;
	  return {
	  	...state,
	  	messagesData: [...state.messagesData, {id: state.messagesData.length + 1, message: body}], // это новый синтаксис пуша эдемента в массив (push)
	  };
	 default: 
	  return state;
 }
}

export const sendMessageCreator = (newMessageBody) => ({
 type: SEND_MESSAGE, newMessageBody
});