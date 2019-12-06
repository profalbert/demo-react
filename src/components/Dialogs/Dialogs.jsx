import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Field, reduxForm, reset} from 'redux-form';
import {Textarea} from '../../components/common/FormControls/FormControls';
import {required, maxLengthCreator, withoutSpace} from '../../utils/validators/validators';


const maxLengthCreator50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form className={s.messagesForm} onSubmit={props.handleSubmit}>
      <div><Field className={s.messagesFormField} component={Textarea} 
      validate={[required, maxLengthCreator50, withoutSpace]}
      name={"newMessageBody"}
      individerror={"onSubmit"}
      placeholder="Enter your message" /></div>
      <div><button className={s.messagesFormButton}>Send</button></div>
   </form>
  )
}


const afterSubmit = (result, dispatch) =>
  dispatch(reset('DialogAddMessageForm'));
  
const AddMessageFormRedux = reduxForm({
  form: 'DialogAddMessageForm',
  onSubmitSuccess: afterSubmit
})(AddMessageForm);



const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogsData.map( d=> <DialogItem name={d.name} key={d.id} id={d.id}/>);
  let messagesElements = state.messagesData.map( m => <Message message={m.message} key={m.id}/>);

  let addNewMessage = (values) => {
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


export default Dialogs;