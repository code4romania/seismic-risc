import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ label, size }) => {
  return (
    <div className={`chip ${size}`}>
      <span>{label}</span>
    </div>
  );
};

Chip.defaultProps = {
  size: undefined,
};

Chip.propTypes = {
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  size: PropTypes.oneOf(['small']),
};

export default Chip;
