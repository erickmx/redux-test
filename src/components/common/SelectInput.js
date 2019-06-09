import React from "react";
import { string, func, arrayOf, shape, oneOfType, number } from "prop-types";

const SelectInput = ({
  name,
  label,
  error,
  value,
  onChange,
  options,
  defaultOption
}) => (
  <div className={`form-group ${error && "has-error"}`}>
    {/* eslint-disable-next-line jsx-a11y/label-has-for */}
    <label htmlFor={name}>{label}</label>
    <div className="field">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="">{defaultOption}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  </div>
);

SelectInput.propTypes = {
  value: oneOfType([string.isRequired, number.isRequired]).isRequired,
  onChange: func.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  defaultOption: string,
  error: string,
  options: arrayOf(
    shape({
      value: oneOfType([string.isRequired, number.isRequired]),
      text: string.isRequired
    }).isRequired
  ).isRequired
};

SelectInput.defaultProps = {
  defaultOption: "",
  error: ""
};

export default SelectInput;
