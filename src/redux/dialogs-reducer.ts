import { InferActionsTypes } from './redux-store'

interface initialStateType {
  messagesData: Array<{ id: number; message: string }>
  dialogsData: Array<{ id: number; name: string }>
}
const initialState: initialStateType = {
  messagesData: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How are you doing?' },
    { id: 3, message: 'GG' },
    { id: 4, message: 'GG' },
    { id: 5, message: 'GG' },
    { id: 6, message: 'GG' },
  ],
  dialogsData: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Sveta' },
    { id: 4, name: 'Sasha' },
    { id: 5, name: 'Valera' },
    { id: 6, name: 'Albert' },
  ],
}

export const dialogsReducer = (
  state = initialState,
  action: DialogsActionsTypes,
): initialStateType => {
  switch (action.type) {
    case 'dialogs/SEND_MESSAGE':
      const body = action.newMessageBody
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: state.messagesData.length + 1, message: body },
        ], // это новый синтаксис пуша эдемента в массив (push)
      }
    default:
      return state
  }
}

export type DialogsActionsTypes = InferActionsTypes<typeof dialogsActions>

export const dialogsActions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({
      type: 'dialogs/SEND_MESSAGE',
      newMessageBody,
      payload: { captchaUrl: 5 },
    } as const),
}
