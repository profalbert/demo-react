import { PostType, ProfileType } from './../types/types'
import { profileReducer, profileActions } from './profile-reducer'

it('length of posts should be incremented', () => {
  const state = {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 12 },
      { id: 2, message: 'It is my first post', likesCount: 22 },
      { id: 3, message: 'Good', likesCount: 14 },
      { id: 4, message: 'BB', likesCount: 16 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: null as string | null,
  }

  const action = profileActions.addPostActionCreator('it-kama')
  const newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct', () => {
  const state = {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 12 },
      { id: 2, message: 'It is my first post', likesCount: 22 },
      { id: 3, message: 'Good', likesCount: 14 },
      { id: 4, message: 'BB', likesCount: 16 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: null as string | null,
  }

  const action = profileActions.addPostActionCreator('it-kama')
  const newState = profileReducer(state, action)
  expect(newState.posts[4].message).toBe('it-kama')
})

it('after deleting length of messages ', () => {
  const state = {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 12 },
      { id: 2, message: 'It is my first post', likesCount: 22 },
      { id: 3, message: 'Good', likesCount: 14 },
      { id: 4, message: 'BB', likesCount: 16 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: null as string | null,
  }

  const action = profileActions.deletePost(1)
  const newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(3)
})
