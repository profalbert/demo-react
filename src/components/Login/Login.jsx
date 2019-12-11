import React from 'react';
import {reduxForm} from 'redux-form';
import {Input} from '../../components/common/FormControls/FormControls';
import {required, maxLengthCreator, withoutSpace} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {createField} from '../common/FormControls/FormControls';
import s from "../common/FormControls/FormControls.module.css";


const maxLengthCreator50 = maxLengthCreator(50);

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form className={s.formLogin} onSubmit={handleSubmit}>
      <div className={s.formMiniBlock}>
        <div className={s.formTitle}>Email:</div>
        <div className={s.formInput}>{createField("Email", "email", [required, maxLengthCreator50, withoutSpace], Input, "text", {})}</div>
      </div>
      <div className={s.formMiniBlock}>
        <div className={s.formTitle}>Password:</div>
        <div className={s.formInput}>{createField("Password", "password", [required, maxLengthCreator50, withoutSpace], Input, "password", {})}</div>
      </div>
      <div className={s.formMiniBlockCheckbox}>
        <div className={s.formTitle}>Remember me:</div>
        <div className={s.formCheckbox}>
          {createField("", "rememberMe", [], Input, "checkbox", {})}
        </div>
      </div>
       
      {captchaUrl && <div className={s.captchaWrap + ' ' + s.formMiniBlock}>
        <div  className={s.captchaDescr}>Enter the characters from the image:</div>
        <div  className={s.captchaImg + ' ' + s.formInput}><img src={captchaUrl} alt="Captcha"/></div>
        <div  className={s.captchaInput + ' ' + s.formInput}>{createField("Symbols from image", "captcha", [required, withoutSpace], Input, "text", {})}</div>
      </div>}

      {error 
      && <div className={s.formSummaryErrorLoginBlock}>
           <div className={s.formSummaryError}>{error}</div>
         </div>
      }   

      <div><button className={s.formButtonLogin}>Login</button></div>
    </form>
  );
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);


const Login = (props) => {
  let captchaUrl = props.captchaUrl;
  
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, true, formData.captcha);
  }
  
  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return (
    <div>
      <h1 className={s.LoginH1}>LOGIN</h1>
      <div className={s.LoginWrapperGlobal}>
        <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>

        <div className={s.testAccountWrapper}>
          <div className={s.testAccountTitle}>Test account</div>
          <div className={s.testAccountDescr}>if you are an employer, you can use a test account to log in.</div>
          
          <div className={s.testAccountMiniBlockWrap}>
            <div className={s.testAccountMiniBlock}>
              <b>Email: </b>siseros589@mailhub.pro
            </div>
            <div className={s.testAccountMiniBlock}>
              <b>Password: </b>free
            </div>
          </div>  

          <div className={s.testAccountAttention}>Attention! This account has a limit on server requests</div>      
        </div>
      </div>      
    </div>
  );
}


let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
    authorizedUserId: state.auth.authorizedUserId
  }
}
let mapDispatchToProps = {
  login
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);