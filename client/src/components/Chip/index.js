import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Chip = ({ label, size }) => {
  const chipClass = classNames('chip', size);

  return (
    <div className={chipClass}>
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
