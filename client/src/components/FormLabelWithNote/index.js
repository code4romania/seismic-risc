import React from 'react';

const FormLabelWithNote = ({ label, note }) => (
  <>
    <span>{label}</span>
    {note && <div className="label-note">{note}</div>}
  </>
);

export default FormLabelWithNote;
