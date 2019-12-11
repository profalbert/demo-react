import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {setUserProfileThunk, savePhotoThunk, saveProfileThunk,
 getStatusThunk, updateStatusThunk} from '../../redux/profile-reducer';
import {setPhotosMeThunk} from '../../redux/auth-reducer';
import {compose} from 'redux';
import Preloader from '../common/Preloader/Preloader';
import s from './Profile.module.css';


class ProfileContainer extends React.Component{
	state = {
		isUserIdRedirect: false,
		editMode: false
	}	

  activateEditMode = () => {
    this.setState({
      isUserIdRedirect: true
		});
  }

	refreshProfile() {
		let userId = this.props.match.params.userId;
		if(!userId) {
			userId = this.props.authorizedUserId;
			if(!userId) {
				this.activateEditMode();

				// this.props.history.push("/login"); // аналог redirect, 
				// //   но он внедряется в методы жизненных циклов, 
				// //   поэтому лучше использовать реже такой вариант, 
				// //   и вместо него использувать обычный redirect через jsx
			}
		}

		if(userId) {
			this.props.setUserProfileThunk(userId)
			.catch((error)=>{
				this.setState({
					editMode: true
				});
			})
			this.props.getStatusThunk(userId);
			this.props.setPhotosMeThunk(this.props.authorizedUserId, true);
		}
	}

	componentDidMount() {
		this.refreshProfile();
	} 

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}

	render() {
		if (this.state.isUserIdRedirect) return <Redirect to={'/login'} />;
		return (
			<>
				{this.props.isFetching 
				? <div className={s.pCPreloaderBlock}><div className={s.pCPreloader}><Preloader /></div></div>
				: (this.state.editMode ? <div className={s.notFoundUser}>Sorry, but something went wrong...</div> : <Profile {...this.props}
				isOwner={!this.props.match.params.userId}
				authorizedUserId={this.props.authorizedUserId}
				profile={this.props.profile} 
				status={this.props.status}
				savePhoto={this.props.savePhotoThunk}
				saveProfile={this.props.saveProfileThunk}
				updateStatus={this.props.updateStatusThunk}/>) }
			</>		 
		);
	}
}


let mapStateToProps = (state) => {
  return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,
		isFetching: state.usersPage.isFetching
  }
}
let mapDispatchToProps = {
	setUserProfileThunk,
	getStatusThunk,
	updateStatusThunk,
	savePhotoThunk,
	saveProfileThunk,
	setPhotosMeThunk
}


export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer);


