import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const TextInputSection = ({ title, idText, maxlen, required }) => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const handleBlurEvent = () => {
    return value !== '' ? setLabel('active') : setLabel('');
  };
  return (
    <div className="input-box">
      <input
        type="text"
        id={idText}
        name={idText}
        maxLength={maxlen === undefined ? 255 : maxlen}
        className="register__input"
        onInput={(e) => setValue(e.target.value)}
        onFocus={() => setLabel('active')}
        onBlur={() => handleBlurEvent()}
        autoComplete="off"
        required={required}
      />
      <label htmlFor={idText} className={`register__label ${label}`}>
        {title}
      </label>
    </div>
  );
};

TextInputSection.propTypes = {
  title: PropTypes.string.isRequired,
  idText: PropTypes.string.isRequired,
  maxlen: PropTypes.string,
  required: PropTypes.bool,
};
TextInputSection.defaultProps = {
  maxlen: undefined,
  required: false,
};

export default TextInputSection;