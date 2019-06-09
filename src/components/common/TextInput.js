import React from "react";
import { string, func } from "prop-types";

const TextInput = ({ name, label, error, value, onChange, placeholder }) => (
  <div className={`form-group ${error && "has-error"}`}>
    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
    <label htmlFor={name}>{label}</label>
    <div className="field">
      <input
        type="text"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  </div>
);

TextInput.propTypes = {
  onChange: func.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  placeholder: string,
  error: string
};

TextInput.defaultProps = {
  placeholder: "",
  error: ""
};

export default TextInput;
