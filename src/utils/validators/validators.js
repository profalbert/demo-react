
export const maxLengthCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  } else {
    return undefined;    
  }
}

export const required = value => {
  if (value) {
    return undefined;
  } else {
    return "Field is required";    
  }
}

export const withoutSpace = (value) => {
  if (value) {
    let str = value.replace(/\s/g, '');
    if (!str) {
      return "You entered only spaces";
    } else {
      return undefined;
    }
  }
}




