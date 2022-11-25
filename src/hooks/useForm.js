import { useState, useCallback } from 'react';
import validator from 'validator';

import { EMAIL_VALIDATION_ERROR_TEXT } from '../utils/scripts/constants';

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value, validationMessage } = event.target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(event.target.closest('form').checkValidity());

    if (name === 'email') {
      if (validator.isEmail(value)) {
        setErrors({ ...errors, [name]: '' });
        setIsValid(true);
      } else {
        setErrors({ ...errors, [name]: EMAIL_VALIDATION_ERROR_TEXT });
        setIsValid(false);
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setIsValid,
    handleChange,
    resetForm,
  };
}
