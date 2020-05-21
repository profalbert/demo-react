import { AppStateType } from './../redux/redux-store';
import { UsersActionsTypes } from './../redux/users-reducer';
import { ProfileActionsTypes } from './../redux/profile-reducer';
import { DialogsActionsTypes } from './../redux/dialogs-reducer';
import { AuthActionsTypes } from './../redux/auth-reducer';
import { AppActionsTypes } from './../redux/app-reducer';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { FormAction } from 'redux-form';


export type PostType = {
	id: number
	message: string
	likesCount: number
}

export type ProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
	aboutMe: string
}

export type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainKink: string
}

export type PhotosType = {
	small: string | null
	large: string | null
}

export type UserType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
}


export type ActionsTypes = FormAction | UsersActionsTypes | ProfileActionsTypes | DialogsActionsTypes | AuthActionsTypes | AppActionsTypes

export type GetStateType = () => AppStateType
export type DispatchType = Dispatch<ActionsTypes>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>



