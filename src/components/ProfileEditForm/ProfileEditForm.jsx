import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';

import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorElement from '../ErrorElement/ErrorElement';

import { INPUT_LIST, NAME_REGEX, SUCCESSFUL_UPDATE_TEXT } from '../../utils/scripts/constants';

import './ProfileEditForm.css';

function ProfileEditForm({
  apiErrorText,
  onSubmitForm,
  isSuccessfulUpdate,
  isEditingMode,
  setIsEditingMode,
  onSignOut,
  isRequestGoingOn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const {
    values, errors, isValid, setValues, setIsValid, handleChange,
  } = useForm();

  const profileInputList = INPUT_LIST.filter(({ name }) => name === 'name' || name === 'email');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitForm({ name: values.name, email: values.email, currentEmail: currentUser.email });
  }

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.email, currentUser.name, setValues]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  });

  return (
    <section className="profile-edit-form">
      <h2 className="profile-edit-form__title">{`Привет, ${currentUser.name}!`}</h2>
      <form className="profile-edit-form__form" name="profile" onSubmit={handleSubmit} noValidate>
        {profileInputList.map(({
          name, type, id, labelText, minLength, maxLength,
        }) => (
          <div className="profile-edit-form__field" key={id}>
            <span className="profile-edit-form__label">{labelText}</span>
            <Input
              inputClassName="profile-edit-form__input"
              type={type}
              name={name}
              id={`input-${name}`}
              onChange={(event) => {
                handleChange(event);
              }}
              value={values[name]}
              wrapperClassName="profile-edit-form__input-wrapper"
              inputErrorClassName="profile-edit-form__input-error"
              inputErrorText={errors[name]}
              minLength={minLength}
              maxLength={maxLength}
              pattern={name === 'name' ? NAME_REGEX : null}
              required
              disabled={!isEditingMode || isRequestGoingOn}
            />
          </div>
        ))}
        {!isEditingMode ? (
          <>
            <span className="profile-edit-form__api-success">
              {isSuccessfulUpdate ? SUCCESSFUL_UPDATE_TEXT : ''}
            </span>
            <Button
              className="profile-edit-form__edit-button"
              onClick={() => {
                setIsEditingMode(true);
              }}
            >
              Редактировать
            </Button>
            <Button
              className="profile-edit-form__exit-button"
              onClick={() => {
                onSignOut();
              }}
            >
              Выйти из&nbsp;аккаунта
            </Button>
          </>
        ) : (
          <>
            <ErrorElement className="profile-edit-form__api-error" text={apiErrorText} />
            <Button className="profile-edit-form__submit-button" isSubmitButton disabled={!isValid || isRequestGoingOn}>
              Сохранить
            </Button>
          </>
        )}
      </form>
    </section>
  );
}

ProfileEditForm.propTypes = {
  apiErrorText: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  isSuccessfulUpdate: PropTypes.bool.isRequired,
  isEditingMode: PropTypes.bool.isRequired,
  setIsEditingMode: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  isRequestGoingOn: PropTypes.bool.isRequired,
};

export default ProfileEditForm;
