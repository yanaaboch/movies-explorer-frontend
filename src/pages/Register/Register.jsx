import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import LoginContext from '../../contexts/LoginContext';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import UserAuthForm from '../../components/UserAuthForm/UserAuthForm';

import { INPUT_LIST, STATUS, USER_ERROR_TEXT } from '../../utils/scripts/constants';
import { register, login, setToken } from '../../utils/scripts/MainApi';

function Register({ isRequestGoingOn, setIsRequestGoingOn }) {
  const [errorText, setErrorText] = useState('');
  const { setIsLoggedIn } = useContext(LoginContext);
  const registerInputList = INPUT_LIST.map(
    (inputElement) => (inputElement.name === 'name' || 'email' || 'password') && inputElement,
  );
  const { setCurrentUser } = useContext(CurrentUserContext);

  const onRegister = async ({ name, email, password }) => {
    setIsRequestGoingOn(true);

    try {
      const userData = await register({ name, email, password });
      if (userData) {
        const token = await login({ email, password });
        if (token) {
          setCurrentUser(name, email);
          localStorage.setItem('token', token.token);
          setToken(token.token);
          setIsLoggedIn(true);
        }
      }
      setErrorText('');
    } catch (error) {
      switch (+error.message) {
        case STATUS.CONFLICT:
          setErrorText(USER_ERROR_TEXT.ALREADY_EXISTING);
          break;
        default:
          setErrorText(USER_ERROR_TEXT.REGISTRATION_FAILED);
          break;
      }
    }

    setIsRequestGoingOn(false);
  };

  return (
    <>
      <Header isEmptyHeader />
      <Content>
        <UserAuthForm
          title="Добро пожаловать!"
          formName="signup"
          inputList={registerInputList}
          apiErrorText={errorText}
          onSubmitForm={onRegister}
          submitButtonText="Зарегистрироваться"
          isRequestGoingOn={isRequestGoingOn}
          redirectText="Уже зарегистрированы?"
          redirectPath="/signin"
          redirectLinkText="Войти"
        />
      </Content>
    </>
  );
}

Register.propTypes = {
  isRequestGoingOn: PropTypes.bool.isRequired,
  setIsRequestGoingOn: PropTypes.func.isRequired,
};

export default Register;
