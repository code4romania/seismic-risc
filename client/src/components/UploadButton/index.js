import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircleFilled } from '@ant-design/icons';

const UploadButton = ({ name }) => {
  return (
    <div className="upload-btn">
      <PlusCircleFilled />
      <span>{name}</span>
    </div>
  );
};

UploadButton.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default UploadButton;
