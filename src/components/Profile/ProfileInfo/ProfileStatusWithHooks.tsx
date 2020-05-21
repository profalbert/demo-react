import React, {useState, useEffect, ChangeEvent} from 'react';
import s from './ProfileStatusWithHooks.module.css';


type PropsType = {
  statusFromProps: string
  authorizedUserId: number | null
  isOwner: boolean
  match: any
  updateStatus: (status: string) => void
}


const ProfileStatusWithHooks: React.FC<PropsType> = ({isOwner, statusFromProps, updateStatus, authorizedUserId, ...props}) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [status, setStatus] = useState(statusFromProps)
  let [errorStatus, setErrorStatus] = useState<string | null>(null)
  
  useEffect(() => { // срабатывает в самом конце компоненты
    setStatus(statusFromProps)
  }, [statusFromProps]) // определяется зависимость в []
  // отрисовки (первый раз в любом случае, а дальше по зависимости)

  let idComparison: boolean
  if (authorizedUserId !== null) {
    idComparison = +authorizedUserId === +props.match.params.userId
  } else {
    idComparison = false
  }
  let ownerExpression = isOwner || idComparison

  const activateMode = () => {
    if(ownerExpression) {
      setEditMode(true);
    }
  }
  const deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 300) {
      setEditMode(false);
      new Promise(() => updateStatus(status))
      .catch((error: string) => {
        setErrorStatus(error);
      })
    } 
  }  
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            {statusFromProps
            ? `"${statusFromProps}"` 
            : `"no information"`}
          </span>
        </div>
      : <div className={s.statusFromState}>
          <b className={s.statusFromStateTitle}>Status: </b>

          {ownerExpression
          && <input className={s.statusFromStateInput} onChange={onStatusChange} 
          autoFocus={true} 
          onBlur={deactivateEditMode} 
          value={status || ''}></input>} 

          {errorStatus && <div className={s.errorStatus}>{errorStatus}</div> } 
        </div>}        
    </div>
    );
}


export default ProfileStatusWithHooks;