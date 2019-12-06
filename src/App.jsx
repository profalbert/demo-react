import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Navbar/Navbar';
import {Route, Switch} from 'react-router-dom';
import {initializeApp} from './redux/app-reducer'; 
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter, Redirect} from 'react-router-dom';
import withSuspense from './hoc/withSuspense';
import Preloader from './components/common/Preloader/Preloader';


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));


class AppContainer extends React.Component {
  catchAllUnhandleErrors = (reason, promise) => {
    console.log("Error! Reason: " + reason);
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
              <Route path="/profile/:userId?" render={withSuspense(() => <ProfileContainer />)}/>
              <Route path="/dialogs" render={withSuspense(() => <DialogsContainer />)}/>  
              <Route path="/users" render={withSuspense(() => <UsersContainer />)}/> 
              <Route path="/login" render={withSuspense(() => <LoginPage />)}/> 
              <Route path="*" render={() =>(<div className={"error404"}>404: NOT FOUND</div>)}/> 
            </Switch>
          </div>
        </div>  

      </div>
    );
  }
}


let mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}
let mapDispatchToProps = {
  initializeApp
}


const App  = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AppContainer)

export default App;
