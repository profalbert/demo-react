import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { AppStateType } from '../redux/redux-store';


type MapStatePropsType = {
  isAuth: boolean
}
type PropsType = MapStatePropsType


let mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => {
  return {
		isAuth: state.auth.isAuth
  }
}


const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  class RedirectComponent extends React.Component<PropsType> {
    render() {
      let {isAuth, ...restProps} = this.props;
		  if (!isAuth) return <Redirect to={'/login'} />;
      return  (
        <WrappedComponent {...restProps}/>
			);
    }
	}
  let ConnectedAuthRedirectComponent = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
}


export default withAuthRedirect;

