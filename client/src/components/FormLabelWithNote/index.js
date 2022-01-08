import React from 'react';

const FormLabelWithNote = ({ label, note }) => (
  <>
    <span>{label}</span>
    {note && <div style={{ fontWeight: 'normal' }}>{note}</div>}
  </>
);

export default FormLabelWithNote;
