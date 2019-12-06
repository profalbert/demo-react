import React from 'react';
import s from './FormControls.module.css';
import {Field} from 'redux-form';



export const FormControl = (props) => {
  let hasError = null;
  if (props.individerror === "onSubmit") {
    hasError = props.meta.error && props.meta.submitFailed;
  } else {
    hasError = props.meta.error && props.meta.touched;
  }
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <div>
        {props.children}
      </div>  
      {hasError && <span>{props.meta.error}</span>}
    </div>
  );
}


export const Textarea = (props) => {
  const {input, meta, child, element, ...restProps} = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
}


export const Input = (props) => {
  const {input, meta, child, element, ...restProps} = props;
  return (
    <FormControl {...props}> 
      <input {...input} {...restProps}/>
    </FormControl>
  );
}


export const createField = (placeholder, name, validators, component, type, props = {}, text = "", individerror) => {
  return (
    <div>
      <Field validate={validators} 
           name={name} type={type}
           component={component} placeholder={placeholder}
           {...props} individerror={individerror}/>
      {text}
    </div>
  )
}


