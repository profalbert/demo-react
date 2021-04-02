import React from 'react'
import s from './FormControls.module.css'
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
  individerror: string
}

export const FormControl: React.FC<FormControlPropsType> = ({
  meta,
  individerror,
  children,
}) => {
  let hasError = null
  if (individerror === 'onSubmit') {
    hasError = meta.error && meta.submitFailed
  } else {
    hasError = meta.error && meta.touched
  }

  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
      <div>{children}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}

type componentOwnPropsType = {
  individerror: string
  className: string
}

export const Textarea: React.FC<WrappedFieldProps & componentOwnPropsType> = (
  props,
) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  )
}

export const Input: React.FC<WrappedFieldProps & componentOwnPropsType> = (
  props,
) => {
  const { input, meta, className, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export const createField = <FormKeysType extends string>(
  placeholder: string,
  name: FormKeysType, // extends string - это ограничение на тип дженерика (только строка)
  validators: Array<FieldValidatorType>,
  component: string | React.FC<WrappedFieldProps & componentOwnPropsType>,
  type: string,
  props = {},
) => {
  return (
    <div>
      <Field
        validate={validators}
        name={name}
        type={type}
        component={component}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}
