import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';


type PropsType = {
  isOwner: boolean
  authorizedUserId: number | null
  profile: ProfileType | null
  status: string
  savePhoto: (photoFile: File, myId: number) => void
  saveProfile: (profile: ProfileType) => void
  updateStatus: (status: string) => void
  match: any
}

const Profile: React.FC<PropsType> = (props) => {
  return (
   <div className={s.content}>
     <ProfileInfo profile={props.profile}
                  isOwner={props.isOwner}
                  status={props.status}
                  authorizedUserId={props.authorizedUserId}
                  savePhoto={props.savePhoto}
                  saveProfile={props.saveProfile}
                  updateStatus={props.updateStatus}
                  match={props.match} />
                  
     {( (Number(props.match.params.userId) === Number(props.authorizedUserId)) || (!props.match.params.userId) ) 
     && <MyPostsContainer />} 
   </div>
  );
}


export default Profile;

