import React, {useState, useEffect} from 'react';
import s from './ProfileStatusWithHooks.module.css';


const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  let [errorStatus, setErrorStatus] = useState(null);
  
  useEffect(() => { // срабатывает в самом конце компоненты
    setStatus(props.status);
  }, [props.status]); // определяется зависимость в []
  // отрисовки (первый раз само, а дальше по зависимости)

  let ownerExpression = props.isOwner || +props.authorizedUserId === +props.match.params.userId;

  const activateMode = () => {
    if(ownerExpression) {
      setEditMode(true);
    }
  }
  const deactivateEditMode = (e) => {
    if (e.currentTarget.value.length <= 300) {
      setEditMode(false);
      props.updateStatus(status)
      .catch((error) => {
        setErrorStatus(error);
      });
    } 
  }  
  const onStatusChange = (e) => {
    if (e.currentTarget.value.length <= 301) {
      setStatus(e.currentTarget.value);
      setErrorStatus(null);
    }
    if (e.currentTarget.value.length === 301 || e.currentTarget.value.length > 301)  {
      setErrorStatus("Max Status length is 300 symbols");
    }
  }

  return (
    <div>
      {!editMode
      ? <div className={s.statusFromProps}>
          <span onDoubleClick={activateMode}>
            {props.status 
            ? `"${props.status}"` 
            : `"no information"`}
          </span>
        </div>
      : <div className={s.statusFromState}>
          <b className={s.statusFromStateTitle}>Status: </b>

          {ownerExpression
          && <input className={s.statusFromStateInput} onChange={onStatusChange} 
          autoFocus={true} 
          onBlur={deactivateEditMode} 
          value={status}></input>} 

          {errorStatus && <div className={s.errorStatus}>{errorStatus}</div> } 
        </div>}        
    </div>
    );
}


export default ProfileStatusWithHooks;