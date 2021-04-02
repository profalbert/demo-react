import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/redux-store'
import { RM } from '../router/RouterManager'

type MapStatePropsType = {
  isAuth: boolean
}
type PropsType = MapStatePropsType

const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
  }
}

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  class RedirectComponent extends React.Component<PropsType> {
    render() {
      const { isAuth, ...restProps } = this.props
      if (!isAuth) return <Redirect to={RM.login.path} />
      return <WrappedComponent {...restProps} />
    }
  }
  const ConnectedAuthRedirectComponent = connect<
    MapStatePropsType,
    {},
    {},
    AppStateType
  >(mapStateToPropsForRedirect)(RedirectComponent)
  return ConnectedAuthRedirectComponent
}

export default withAuthRedirect
