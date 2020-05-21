import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {reduxForm, reset, InjectedFormProps} from 'redux-form';
import {Textarea, createField} from '../../components/common/FormControls/FormControls';
import {required, maxLengthCreator, withoutSpace} from '../../utils/validators/validators';
import { DispatchType } from '../../types/types';


type PropsType = {
  dialogsPage: {
    messagesData: Array<{id: number, message: string}>
	  dialogsData: Array<{id: number, name: string}>
  }
  sendMessage: (newMessageBody: string) => void
}


const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogsData.map( d=> <DialogItem name={d.name} key={d.id} id={d.id}/>);
  let messagesElements = state.messagesData.map( m => <Message message={m.message} key={m.id}/>);

  let addNewMessage = (values: AddMessageFormValuesType) => {
    (!!values.newMessageBody) && props.sendMessage(values.newMessageBody);
  }

  return (
   <div className={s.dialogs}>
   	<div className={s.dialogsItems}>
      <div className={s.dialogsItemsTitle}>My friends:</div>
      { dialogsElements }
   	</div>
   	<div className={s.messages}>
      <div className={s.messagesItem}>{ messagesElements }</div>
   		<AddMessageFormRedux onSubmit={addNewMessage}/>
   	</div>
   </div>
  );
}


type AddMessageFormValuesType = {
  newMessageBody: string
}
type AddMessageFormValuesKeysType = Extract<keyof AddMessageFormValuesType, string>
const maxLengthCreator50 = maxLengthCreator(50);

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValuesType>> = ({handleSubmit}) => {
  return (
    <form className={s.messagesForm} onSubmit={handleSubmit}>
      <div>
        {createField<AddMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLengthCreator50, withoutSpace], 
        Textarea, "text", {individerror: "onSubmit", className: s.messagesFormField})}
      </div>
      <div><button className={s.messagesFormButton}>Send</button></div>
   </form>
  )
}

const afterSubmit = (result: object, dispatch: DispatchType) =>
  dispatch(reset('DialogAddMessageForm'));
  
const AddMessageFormRedux = reduxForm<AddMessageFormValuesType>({
  form: 'DialogAddMessageForm',
  onSubmitSuccess: afterSubmit
})(AddMessageForm);


export default Dialogs;

