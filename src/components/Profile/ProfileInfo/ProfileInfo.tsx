import React, { useState, ChangeEvent } from 'react'
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import {
  createField,
  Input,
  Textarea,
} from '../../common/FormControls/FormControls'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import { reduxForm, InjectedFormProps } from 'redux-form'
import s2 from '../../common/FormControls/FormControls.module.css'
import iconImg from '../../../assets/user.svg'
import { ProfileType, ContactsType } from '../../../types/types'

type ProfileInfoPropsType = {
  isOwner: boolean
  authorizedUserId: number | null
  profile: ProfileType | null
  status: string
  match: any
  savePhoto: (photoFile: File, myId: number) => void
  saveProfile: (profile: ProfileType) => void
  updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
  isOwner,
  authorizedUserId,
  match,
  profile,
  saveProfile,
  savePhoto,
  status,
  updateStatus,
}) => {
  const [editMode, setEditMode] = useState(false)

  const ownerExpression =
    isOwner || Number(authorizedUserId) === Number(match.params.userId)

  if (!profile) {
    return (
      <div className={s.pCPreloaderBlock}>
        <div className={s.pCPreloader}>
          <Preloader />
        </div>
      </div>
    )
  }

  const onSubmit = (formData: ProfileDataFormValues) => {
    // todo: изменить подход then на props
    new Promise(() => saveProfile({ ...profile, ...formData })).then(() => {
      setEditMode(false)
    })
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && authorizedUserId) {
      savePhoto(e.target.files[0], authorizedUserId)
    }
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large !== null ? profile.photos.large : iconImg}
          alt='photos-user'
        />

        {ownerExpression && (
          <div className={s.file}>
            <input
              id={'inputFileImg'}
              type={'file'}
              onChange={onMainPhotoSelected}
            />
            <label htmlFor='inputFileImg'>Сhange photo</label>
          </div>
        )}

        <ProfileStatusWithHooks
          statusFromProps={status}
          isOwner={isOwner}
          authorizedUserId={authorizedUserId}
          match={match}
          updateStatus={updateStatus}
        />

        {editMode ? (
          <ProfileDataFormReduxForm
            profile={profile}
            initialValues={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true)
            }}
            profile={profile}
            ownerExpression={ownerExpression}
          />
        )}
      </div>
    </div>
  )
}

export default ProfileInfo

type ProfileDataOwnProps = {
  profile: ProfileType | null
}

type ProfileDataFormValues = {
  aboutMe: string
  contacts: ContactsType
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
}

type ProfileDataFormKeys = Extract<keyof ProfileDataFormValues, string>

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileDataFormValues, ProfileDataOwnProps> &
    ProfileDataOwnProps
> = ({ profile, error, handleSubmit }) => {
  return (
    <form className={s.profileForm} onSubmit={handleSubmit}>
      <div className={s.profileMiniBlock}>
        <b>Full name: </b>
        {createField<ProfileDataFormKeys>(
          'Full name',
          'fullName',
          [],
          Input,
          'text',
          {},
        )}
      </div>
      <div className={s.profileMiniBlock}>
        <b>Loking for a job: </b>
        <div className={s.profileMiniBlockCheckbox}>
          {createField<ProfileDataFormKeys>(
            '',
            'lookingForAJob',
            [],
            Input,
            'checkbox',
            {},
          )}
        </div>
      </div>
      <div className={s.profileMiniBlock}>
        <b>My professional skills: </b>
        {createField<ProfileDataFormKeys>(
          'My professional skills',
          'lookingForAJobDescription',
          [],
          Textarea,
          'text',
          {},
        )}
      </div>
      <div className={s.profileMiniBlock}>
        <b>About me: </b>
        {createField<ProfileDataFormKeys>(
          'About me',
          'aboutMe',
          [],
          Textarea,
          'text',
          {},
        )}
      </div>

      <div className={s.profileMiniBlock}>
        <b>Contacts: </b>{' '}
        {profile &&
          Object.keys(profile.contacts).map((key) => (
            <div key={key} className={s.Contact}>
              <b>{key}:</b> {/* todo: сделать дженерик тип для этого поля*/}{' '}
              {createField(key, `contacts.${key}`, [], Input, 'text', {})}
            </div>
          ))}
      </div>

      <div>
        <button className={s.profileFormButtonSave}>Save</button>
      </div>
      {
        error && (
          <div className={s2.formSummaryErrorWrap}>
            <div className={s2.formSummaryError}>{error}</div>
          </div>
        )
        /*Общая ошибка, работает в profile-reducer, если там только _error */
      }
    </form>
  )
}
const ProfileDataFormReduxForm = reduxForm<
  ProfileDataFormValues,
  ProfileDataOwnProps
>({
  form: 'edit-profile',
})(ProfileDataForm)

type ProfileDataPropsType = {
  profile: ProfileType | null
  ownerExpression: boolean
  goToEditMode: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  ownerExpression,
  goToEditMode,
}) => {
  const noInfo = 'no information'
  type ContactsKeysType = keyof ContactsType

  return (
    <>
      {profile && (
        <div className={s.formInfo}>
          <div className={s.formInfoTitle}>
            <b>Full name: </b> {profile.fullName}
          </div>
          <div className={s.formInfoTitle}>
            <b>Loking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no'}
          </div>
          {profile.lookingForAJob && (
            <div className={s.formInfoTitle}>
              <b>My professional skills: </b>{' '}
              {profile.lookingForAJobDescription}
            </div>
          )}
          <div className={s.formInfoTitle}>
            <b>About me: </b> {profile.aboutMe || noInfo}
          </div>
          <div className={s.formInfoTitle}>
            <b className={s.ContactMain}>Contacts: </b>
            {profile
              ? Object.keys(profile.contacts).filter(
                  (key) => profile.contacts[key as ContactsKeysType] || false,
                ).length > 0
                ? Object.keys(profile.contacts)
                    .filter(
                      (key) =>
                        profile.contacts[key as ContactsKeysType] || false,
                    )
                    .map((key) => (
                      <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as ContactsKeysType]}
                      />
                    ))
                : noInfo
              : noInfo}
          </div>
          {ownerExpression && (
            <div>
              <button className={s.formButtonEdit} onClick={goToEditMode}>
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={s.Contact}>
      <b>{contactTitle}: </b>
      <a
        className={s.ContactLink}
        target='_blank'
        rel='noopener noreferrer'
        href={contactValue}
      >
        {contactValue}
      </a>
    </div>
  )
}
