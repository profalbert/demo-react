import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'
import {
  setUserProfileThunk,
  savePhotoThunk,
  saveProfileThunk,
  getStatusThunk,
  updateStatusThunk,
} from '../../redux/profile-reducer'
import { setPhotosMeThunk } from '../../redux/auth-reducer'
import { compose } from 'redux'
import Preloader from '../common/Preloader/Preloader'
import s from './Profile.module.css'
import { AppStateType } from '../../redux/redux-store'
import { ProfileType } from '../../types/types'
import { RM } from '../../router/RouterManager'

type MapStatePropsType = {
  profile: ProfileType | null
  status: string
  authorizedUserId: number | null
  isAuth: boolean
  isFetching: boolean
}
type MapDispatchPropsType = {
  savePhotoThunk: (photoFile: File, myId: number) => void
  saveProfileThunk: (profile: ProfileType) => void
  updateStatusThunk: (status: string) => void
  getStatusThunk: (userId: number) => void
  setPhotosMeThunk: (userId: number) => void
  setUserProfileThunk: (userId: number) => void
}
type OwnPropsType = {}
type PathParamsType = {
  userId: string
}
type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  OwnPropsType &
  RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  state = {
    isUserIdRedirect: false,
    editMode: false,
  }

  activateEditMode = () => {
    this.setState({
      isUserIdRedirect: true,
    })
  }

  refreshProfile() {
    let userId: number = Number(this.props.match.params.userId)
    if (!userId) {
      this.props.authorizedUserId && (userId = this.props.authorizedUserId)
      if (!userId) {
        this.activateEditMode()

        // this.props.history.push("/login"); // аналог redirect,
        // //   но он внедряется в методы жизненных циклов,
        // //   поэтому лучше использовать реже такой вариант,
        // //   и вместо него использувать обычный redirect через jsx
      }
    }

    if (userId) {
      new Promise(() => this.props.setUserProfileThunk(userId)).catch(() => {
        this.setState({
          editMode: true,
        })
      })
      this.props.getStatusThunk(userId)
      this.props.authorizedUserId &&
        this.props.setPhotosMeThunk(this.props.authorizedUserId)
    }
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: any, snapshot: any) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    if (this.state.isUserIdRedirect) return <Redirect to={RM.login.path} />
    return (
      <>
        {this.props.isFetching ? (
          <div className={s.pCPreloaderBlock}>
            <div className={s.pCPreloader}>
              <Preloader />
            </div>
          </div>
        ) : this.state.editMode ? (
          <div className={s.notFoundUser}>
            Sorry, but something went wrong...
          </div>
        ) : (
          <Profile
            isOwner={!this.props.match.params.userId}
            authorizedUserId={this.props.authorizedUserId}
            profile={this.props.profile}
            status={this.props.status}
            savePhoto={this.props.savePhotoThunk}
            saveProfile={this.props.saveProfileThunk}
            updateStatus={this.props.updateStatusThunk}
            match={this.props.match}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isFetching: state.usersPage.isFetching,
  }
}
const mapDispatchToProps: MapDispatchPropsType = {
  setUserProfileThunk,
  getStatusThunk,
  updateStatusThunk,
  savePhotoThunk,
  saveProfileThunk,
  setPhotosMeThunk,
}

export default compose<React.ComponentType>(
  withRouter,
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfileContainer)
