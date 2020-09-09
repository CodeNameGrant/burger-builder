export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
  if (rules.requried && value === '') {
    return false;
  }

  if (rules.exactLength && value.length !== rules.exactLength) {
    return false;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return false;
  }

  if (rules.isEmail) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(value)) {
      return false;
    }
  }

  return true;
}