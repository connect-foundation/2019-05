import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, className }) => (
  <button type="button" onClick={onClick} className={className}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
