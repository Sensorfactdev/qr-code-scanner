import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InnerButton = styled.button`
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #FFFFFF;
  cursor: pointer;
  font-size: 15px;
  padding: 3px 10px,
`;

const Button = ({ children, onClick }) => (
  <InnerButton
    onClick={onClick}
  >
    {children}
  </InnerButton>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
