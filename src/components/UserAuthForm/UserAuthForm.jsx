import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

import CustomLink from '../CustomLink/CustomLink';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorElement from '../ErrorElement/ErrorElement';

import { NAME_REGEX } from '../../utils/scripts/constants';

import './UserAuthForm.css';

function UserAuthForm({
  title,
  formName,
  inputList,
  apiErrorText,
  onSubmitForm,
  submitButtonText,
  isRequestGoingOn,
  redirectText,
  redirectPath,
  redirectLinkText,
}) {
  const {
    values, errors, isValid, handleChange,
  } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitForm(values);
  }

  return (
    <section className="user-auth-form">
      <h2 className="user-auth-form__title">{title}</h2>
      <form className="user-auth-form__form" name={formName} onSubmit={handleSubmit} noValidate>
        {inputList.map(({
          name, type, id, placeholder, labelText, minLength, maxLength,
        }) => (
          <Input
            key={id}
            inputClassName="user-auth-form__input"
            type={type}
            name={name}
            id={`input-${name}`}
            onChange={(event) => {
              handleChange(event);
            }}
            value={values[name]}
            placeholder={placeholder}
            isLabelShown
            labelClassName="user-auth-form__label"
            labelText={labelText}
            inputErrorClassName="user-auth-form__input-error"
            inputErrorText={errors[name]}
            minLength={minLength}
            maxLength={maxLength}
            pattern={name === 'name' ? NAME_REGEX : null}
            required
            disabled={isRequestGoingOn}
          />
        ))}

        <ErrorElement className="user-auth-form__api-error" text={apiErrorText} />
        <Button
          className="user-auth-form__submit-button"
          isSubmitButton
          disabled={!isValid || isRequestGoingOn || Object.keys(values).length !== inputList.length}
        >
          {submitButtonText}
        </Button>
      </form>
      <div className="user-auth-form__redirect-wrapper">
        <span className="user-auth-form__redirect-text">{redirectText}</span>
        <CustomLink className="user-auth-form__redirect-link" path={redirectPath}>
          {redirectLinkText}
        </CustomLink>
      </div>
    </section>
  );
}

UserAuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  redirectText: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  inputList: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ).isRequired,
  apiErrorText: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  isRequestGoingOn: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string.isRequired,
  redirectLinkText: PropTypes.string.isRequired,
};

export default UserAuthForm;
