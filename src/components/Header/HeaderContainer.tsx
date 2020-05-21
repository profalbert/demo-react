import React, {useEffect} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {logout, setPhotosMeThunk} from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { PhotosType } from '../../types/types';


type MapStatePropsType = {
  isAuth: boolean
  login: string | null
  authorizedUserId: number | null
  photosMe: PhotosType | null
}
type MapDispatchPropsType = {
  logout: () => void
  setPhotosMeThunk: (myId: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const HeaderContainer: React.FC<PropsType> = (props) => {
  let setPhotosMeThunk = props.setPhotosMeThunk;

  useEffect(() => {
    if(!props.photosMe) {
      props.authorizedUserId && setPhotosMeThunk(props.authorizedUserId);
    }
  }, [props.photosMe, props.authorizedUserId, setPhotosMeThunk]);

  return (
    <Header {...props}/>
  );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    authorizedUserId: state.auth.userId,
    photosMe: state.auth.photos
  }
}
let mapDispatchToProps: MapDispatchPropsType = {
 logout,
 setPhotosMeThunk
}


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);

