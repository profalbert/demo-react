import React, {useState, useEffect} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {logout, setPhotosMeThunk} from '../../redux/auth-reducer';


const HeaderContainer = (props) => {
  let [photosMe, setPhotosMe] = useState(props.photosMe);
  let setPhotosMeThunk = props.setPhotosMeThunk;

  useEffect(() => {
    if(!photosMe) {
      setPhotosMe(props.photosMe)
      setPhotosMeThunk(props.authorizedUserId, true);
    }
  }, [props.photosMe, photosMe, props.authorizedUserId, setPhotosMeThunk]);

  return (
    <Header {...props}/>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    authorizedUserId: state.auth.userId,
    photosMe: state.auth.photos
  }
}
let mapDispatchToProps = {
 logout,
 setPhotosMeThunk
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

