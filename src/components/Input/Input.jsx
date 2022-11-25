import React from 'react';
import PropTypes from 'prop-types';
import searchFormIcon from '../../images/search-form-icon.svg';
import Button from '../Button/Button';

import ErrorElement from '../ErrorElement/ErrorElement';

import './Input.css';

function Input({
  inputClassName,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  wrapperClassName,
  isLabelShown,
  labelClassName,
  labelText,
  inputErrorClassName,
  inputErrorText,
  minLength,
  maxLength,
  pattern,
  required,
  disabled,
  searchIcon = false,
}) {
  return (
    <label className={wrapperClassName} htmlFor={id}>
      <span className={`${isLabelShown ? labelClassName : 'visually-hidden'}`}>{labelText}</span>
      {searchIcon && (
        <Button className="search-form__submit-button" isSubmitButton>
          <img
            className="search-form__submit-button-image"
            src={searchFormIcon}
            alt="Найти фильм"
          />
        </Button>
      )}
      <input
        className={`input ${inputClassName}`}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
      {(type === 'text' || 'email' || 'password') && (
        <ErrorElement className={`input-error ${inputErrorClassName}`} text={inputErrorText} />
      )}
    </label>
  );
}

Input.propTypes = {
  inputClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  isLabelShown: PropTypes.bool,
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  inputErrorClassName: PropTypes.string,
  inputErrorText: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  searchIcon: PropTypes.bool,
};

Input.defaultProps = {
  id: null,
  value: '',
  placeholder: null,
  wrapperClassName: '',
  isLabelShown: false,
  labelClassName: '',
  labelText: '',
  inputErrorClassName: '',
  inputErrorText: '',
  minLength: null,
  maxLength: null,
  pattern: null,
  required: false,
  disabled: false,
  searchIcon: false,
};

export default Input;
