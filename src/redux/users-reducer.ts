import { InferActionsTypes } from './redux-store'
import { ResultStandartCodes } from './../api/api'
import { ThunkType, DispatchType } from './../types/types'
import { usersAPI } from '../api/api'
import { updateObjectArray } from '../utils/object-helpers'
import { UserType } from '../types/types'

const initialState = {
  users: [] as Array<UserType> | [],
  pageSize: 5 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true as boolean,
  followingInProgress: [] as Array<number> | [],
}

export const usersReducer = (
  state = initialState,
  action: UsersActionsTypes,
): typeof initialState => {
  switch (action.type) {
    case 'users/FOLLOW': {
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    }
    case 'users/UNFOLLOW': {
      return {
        ...state,
        users: updateObjectArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    }
    case 'users/SET_USERS': {
      return {
        ...state,
        users: action.users,
      }
    }
    case 'users/SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case 'users/SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.count,
      }
    }
    case 'users/TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFollowingInProgress
          ? [...state.followingInProgress, action.userId]
          : [
              ...state.followingInProgress.filter(
                (id: number) => id !== action.userId,
              ),
            ],
      }
    }
    default:
      return state
  }
}

export type UsersActionsTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
  followSuccess: (userId: number) =>
    ({
      type: 'users/FOLLOW',
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: 'users/UNFOLLOW',
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: 'users/SET_USERS',
      users,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: 'users/SET_CURRENT_PAGE',
      currentPage,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'users/SET_TOTAL_USERS_COUNT',
      count: totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'users/TOGGLE_IS_FETCHING',
      isFetching,
    } as const),
  toggleFollowingProgress: (isFollowingInProgress: boolean, userId: number) =>
    ({
      type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFollowingInProgress,
      userId,
    } as const),
}

export const requestUsers = (
  page: number,
  pageSize: number,
): ThunkType => async (dispatch) => {
  dispatch(usersActions.toggleIsFetching(true))
  dispatch(usersActions.setCurrentPage(page))
  const data = await usersAPI.getUsers(page, pageSize)
  dispatch(usersActions.setUsers(data.items))
  dispatch(usersActions.setTotalUsersCount(data.totalCount))
  dispatch(usersActions.toggleIsFetching(false))
}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: Function,
  actionCreator: (userId: number) => UsersActionsTypes,
) => {
  dispatch(usersActions.toggleFollowingProgress(true, userId))
  const response = await apiMethod(userId)
  if (response.resultCode === ResultStandartCodes.Success) {
    dispatch(actionCreator(userId))
    dispatch(usersActions.toggleFollowingProgress(false, userId))
  }
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow,
    usersActions.followSuccess,
  )
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow,
    usersActions.unfollowSuccess,
  )
}
