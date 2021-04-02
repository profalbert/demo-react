import React from 'react'
import './App.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Nav from './components/Navbar/Navbar'
import { Route, Switch } from 'react-router-dom'
import { initializeApp } from './redux/app-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import withSuspense from './hoc/withSuspense'
import Preloader from './components/common/Preloader/Preloader'
import { AppStateType } from './redux/redux-store'
import { ErrorPage } from './404'
import { RM } from './router/RouterManager'

const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer'),
)
const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer'),
)
const UsersContainer = React.lazy(() => import('./components/Users/Users'))
const LoginPage = React.lazy(() => import('./components/Login/Login'))

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedLogin = withSuspense(LoginPage)

type MapStatePropsType = {
  initialized: boolean
}
type MapDispatchPropsType = {
  initializeApp: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class AppContainer extends React.Component<PropsType> {
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    console.log('Error! Reason: ' + e.reason.message)
  }

  componentDidMount() {
    console.log(RM.profile.getUrl(12))

    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors)
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandleErrors,
    )
  }

  render() {
    if (!this.props.initialized) {
      return (
        <div className={'appPreloaderBlock'}>
          <div className={'appPreloader'}>
            <Preloader />
          </div>
        </div>
      )
    }

    return (
      <div className={'appMainWrapperContent'}>
        <div className={'appTextMobileBlockWrap'}>
          <div className={'appTextMobileBlock'}>
            <div className={'appTextMobile'}>
              Hello, this site is not available for viewing on tablet or mobile
              devices.
              <div>
                If you want to still see this site, access it through your
                computer! <span>:)</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'app-wrapper'}>
          <HeaderContainer />
          <Nav />
          <div className={'app-wrapper-content'}>
            <Switch>
              <Redirect exact from={RM.home.path} to={RM.profile.path} />
              <Route
                path={RM.profile.userId.path}
                render={() => <SuspendedProfile />}
              />
              <Route
                path={RM.dialogs.userId.path}
                render={() => <SuspendedDialogs />}
              />
              <Route path={RM.users.path} render={() => <SuspendedUsers />} />
              <Route path={RM.login.path} render={() => <SuspendedLogin />} />
              <Route path={RM.error.path} render={() => <ErrorPage />} />
              <Route path={RM.all.path} render={() => <ErrorPage />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    initialized: state.app.initialized,
  }
}
const mapDispatchToProps: MapDispatchPropsType = {
  initializeApp,
}

const App = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AppContainer)

export default App
