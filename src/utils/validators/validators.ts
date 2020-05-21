export type FieldValidatorType = (value: string) => string | undefined

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
  if (value && value.length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  } else {
    return undefined;    
  }
}

export const required: FieldValidatorType = (value) => {
  if (value) {
    return undefined;
  } else {
    return "Field is required";    
  }
}

export const withoutSpace: FieldValidatorType = (value) => {
  if (value) {
    let str = value.replace(/\s/g, '');
    if (!str) {
      return "You entered only spaces";
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}




