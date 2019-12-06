import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';


const Profile = (props) => {
  return (
   <div className={s.content}>
     <ProfileInfo profile={props.profile}
                  isOwner={props.isOwner}
                  status={props.status}
                  savePhoto={props.savePhoto}
                  saveProfile={props.saveProfile}
                  authorizedUserId={props.authorizedUserId}
                  match={props.match}
                  updateStatus={props.updateStatus} />
                  
     {( (+props.match.params.userId === +props.authorizedUserId) || (!props.match.params.userId) ) 
     && <MyPostsContainer />} 
   </div>
  );
}


export default Profile;