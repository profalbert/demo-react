import MyPosts from './MyPosts'
import { profileActions } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { PostType } from '../../../types/types'

type MapStatePropsType = {
  posts: PostType[]
  newPostText: string | null
}
type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}
type OwnPropsType = {}
// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}
const mapDispatchToProps = {
  addPost: profileActions.addPostActionCreator,
}

const MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps,
)(MyPosts)
export default MyPostsContainer
