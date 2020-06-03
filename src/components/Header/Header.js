import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ name }) => (
  <>
    <h2 className='h3'>{name}</h2>
    <hr />
  </>
);

Header.propTypes = {
  name: PropTypes.string.isRequired
};

export default Header;
