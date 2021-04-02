import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input } from '../../components/common/FormControls/FormControls'
import {
  required,
  maxLengthCreator,
  withoutSpace,
} from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import { createField } from '../common/FormControls/FormControls'
import s from '../common/FormControls/FormControls.module.css'
import { AppStateType } from '../../redux/redux-store'
import { RM } from '../../router/RouterManager'

type LoginFormOwnProps = {
  captchaUrl: string | null
}
type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string> // исключает все варианты, которые по типу не равны string
const maxLengthCreator50 = maxLengthCreator(50)

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form className={s.formLogin} onSubmit={handleSubmit}>
      <div className={s.formMiniBlock}>
        <div className={s.formTitle}>Email:</div>
        <div className={s.formInput}>
          {createField<LoginFormValuesKeysType>(
            'Email',
            'email',
            [required, maxLengthCreator50, withoutSpace],
            Input,
            'text',
            {},
          )}
        </div>
      </div>
      <div className={s.formMiniBlock}>
        <div className={s.formTitle}>Password:</div>
        <div className={s.formInput}>
          {createField<LoginFormValuesKeysType>(
            'Password',
            'password',
            [required, maxLengthCreator50, withoutSpace],
            Input,
            'password',
            {},
          )}
        </div>
      </div>
      <div className={s.formMiniBlockCheckbox}>
        <div className={s.formTitle}>Remember me:</div>
        <div className={s.formCheckbox}>
          {createField<LoginFormValuesKeysType>(
            '',
            'rememberMe',
            [],
            Input,
            'checkbox',
            {},
          )}
        </div>
      </div>

      {captchaUrl && (
        <div className={s.captchaWrap + ' ' + s.formMiniBlock}>
          <div className={s.captchaDescr}>
            Enter the characters from the image:
          </div>
          <div className={s.captchaImg + ' ' + s.formInput}>
            <img src={captchaUrl} alt='Captcha' />
          </div>
          <div className={s.captchaInput + ' ' + s.formInput}>
            {createField<LoginFormValuesKeysType>(
              'Symbols from image',
              'captcha',
              [required, withoutSpace],
              Input,
              'text',
              {},
            )}
          </div>
        </div>
      )}

      {error && (
        <div className={s.formSummaryErrorLoginBlock}>
          <div className={s.formSummaryError}>{error}</div>
        </div>
      )}

      <div>
        <button className={s.formButtonLogin}>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm)

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
  authorizedUserId: number | null
}
type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
  ) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Login: React.FC<PropsType> = (props) => {
  const captchaUrl = props.captchaUrl

  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha,
    )
  }

  if (props.isAuth) {
    return <Redirect to={RM.profile.path} />
  }

  return (
    <div>
      <h1 className={s.LoginH1}>LOGIN</h1>
      <div className={s.LoginWrapperGlobal}>
        <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />

        <div className={s.testAccountWrapper}>
          <div className={s.testAccountTitle}>Test account</div>
          <div className={s.testAccountDescr}>
            if you are an employer, you can use a test account to log in.
          </div>

          <div className={s.testAccountMiniBlockWrap}>
            <div className={s.testAccountMiniBlock}>
              <b>Email: </b>siseros589@mailhub.pro
            </div>
            <div className={s.testAccountMiniBlock}>
              <b>Password: </b>free
            </div>
          </div>

          <div className={s.testAccountAttention}>
            Attention! This account has a limit on server requests
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
    authorizedUserId: state.auth.userId,
  }
}
const mapDispatchToProps: MapDispatchPropsType = {
  login,
}

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
