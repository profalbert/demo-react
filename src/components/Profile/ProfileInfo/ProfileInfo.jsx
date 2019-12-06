import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import {createField, Input, Textarea} from '../../common/FormControls/FormControls';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {reduxForm} from 'redux-form';
import s2 from "../../common/FormControls/FormControls.module.css";
import iconImg from '../../../assets/user.svg';


const noInfo = "no information";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  let ownerExpression = props.isOwner || +props.authorizedUserId === +props.match.params.userId;

  if(!props.profile) {
    return (
      <div className={s.pCPreloaderBlock}>
        <div className={s.pCPreloader}>
          <Preloader />
        </div>
      </div>
    );
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData)
      .then(() => {
        setEditMode(false);
      });    
  }
  
  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      props.savePhoto(e.target.files[0], props.authorizedUserId);
    }
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large !== null 
          ? props.profile.photos.large 
          : iconImg } alt="photos-user"/>
          
        {ownerExpression 
        && <div className={s.file}>
             <input id={"inputFileImg"} type={"file"} onChange={onMainPhotoSelected} />
             <label htmlFor="inputFileImg">Сhange photo</label>
           </div>}

        <ProfileStatusWithHooks status={props.status}
                                isOwner={props.isOwner}
                                authorizedUserId={props.authorizedUserId}
                                match={props.match}
                                updateStatus={props.updateStatus}/>

        {editMode 
        ? <ProfileDataFormReduxForm profile={props.profile} initialValues={props.profile} onSubmit={onSubmit}/> 
        : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={props.profile} ownerExpression={ownerExpression}/>}       
      
      </div>      
    </div>
  );
}


const ProfileData = (props) => {
  let arr = Object.keys(props.profile.contacts)
  .filter(key => (props.profile.contacts[key] && key) || false);
  let contactsElements = arr.map(key => <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>);
  if (contactsElements.length === 0) {
    contactsElements = false;
  }

  return (
    <div className={s.formInfo}>      
      <div className={s.formInfoTitle}>
        <b>Full name: </b> {props.profile.fullName}
      </div>
      <div className={s.formInfoTitle}>
        <b>Loking for a job: </b> {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && 
        <div className={s.formInfoTitle}>
          <b>My professional skills: </b> {props.profile.lookingForAJobDescription}
        </div>
      }
      <div className={s.formInfoTitle}>
        <b>About me: </b> {props.profile.aboutMe || noInfo}
      </div>
      <div className={s.formInfoTitle}>
        <b className={s.ContactMain}>Contacts: </b> {contactsElements || noInfo}
      </div>
      {props.ownerExpression && 
        <div>
          <button className={s.formButtonEdit} onClick={props.goToEditMode}>Edit</button>
        </div>
      }
    </div>
  );
}


const ProfileDataForm = (props) => {
  return (
    <form className={s.profileForm} onSubmit={props.handleSubmit}>      
      <div className={s.profileMiniBlock}>
        <b>Full name: </b> 
        {createField("Full name", "fullName", [], Input, "text")}
      </div>
      <div className={s.profileMiniBlock}>
        <b>Loking for a job: </b>
        <div className={s.profileMiniBlockCheckbox}>{createField("", "lookingForAJob", [], Input, "checkbox")}</div>
      </div>
      <div className={s.profileMiniBlock}>
        <b>My professional skills: </b>
        {createField("My professional skills", "lookingForAJobDescription", [], Textarea, "text")}          
      </div>
      <div className={s.profileMiniBlock}>
        <b>About me: </b>
        {createField("About me", "aboutMe", [], Textarea, "text")}
      </div>

      <div className={s.profileMiniBlock}>
        <b>Contacts: </b> {Object.keys(props.profile.contacts)
        .map(key => <div key={key} className={s.Contact}>
          <b>{key}:</b> {createField(key, "contacts." + key, [], Input, "text")}
        </div>)}
      </div>

      <div>
        <button className={s.profileFormButtonSave}>Save</button>
      </div>
      {props.error 
      && <div className={s2.formSummaryErrorWrap}>
           <div className={s2.formSummaryError}>{props.error}</div> 
         </div>
      /*Общая ошибка, работает в PR, если там только _error */}
    </form>
  );
}
const ProfileDataFormReduxForm =  reduxForm({
  form: 'edit-profile'
})(ProfileDataForm);


const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className={s.Contact}>
      <b>{contactTitle}: </b>
      <a className={s.ContactLink} target="_blank" rel="noopener noreferrer" href={contactValue}>
        {contactValue}
      </a>
    </div>
  );
}


export default ProfileInfo;