import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Navbar/Navbar';
import {Route, Switch} from 'react-router-dom';
import {initializeApp} from './redux/app-reducer'; 
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import withSuspense from './hoc/withSuspense';
import Preloader from './components/common/Preloader/Preloader';
import { AppStateType } from './redux/redux-store';


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));

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
    console.log("Error! Reason: " + e.reason.message)
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
  }

  render(){
    if(!this.props.initialized) {
      return (
        <div className={"appPreloaderBlock"}>
          <div className={"appPreloader"}>
            <Preloader />
          </div>
        </div>
      )
    }

    return (
      <div className='appMainWrapperContent'>

        <div className={"appTextMobileBlockWrap"}>
          <div className={"appTextMobileBlock"}>
              <div className={"appTextMobile"}>Hello, this site is not available for viewing on tablet or mobile devices. <div>If you want to still see this site, access it through your computer! <span>:)</span></div> </div>
          </div>
        </div>

        <div className={"app-wrapper"}><HeaderContainer />
          <Nav />
          <div className="app-wrapper-content">
            <Switch>
              <Redirect exact from="/" to="/profile" />
              <Route path="/profile/:userId?" render={() => <SuspendedProfile />}/>
              <Route path="/dialogs" render={() => <SuspendedDialogs />}/>  
              <Route path="/users" render={() => <SuspendedUsers />}/> 
              <Route path="/login" render={() => <SuspendedLogin />}/> 
              <Route path="*" render={() =>(<div className={"error404"}>404: NOT FOUND</div>)}/> 
            </Switch>
          </div>
        </div>  

      </div>
    );
  }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    initialized: state.app.initialized
  }
}
let mapDispatchToProps: MapDispatchPropsType = {
  initializeApp
}


const App = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(AppContainer)

export default App;
