import React from 'react';
import { components } from 'react-select';

const CheckboxOptions = ({ children, onChange, ...props }) => (
  <components.Option {...props}>
    <div className="flex items-center">
      <input
        type="checkbox"
        {...props.innerProps}
        checked={props.isSelected}
        onChange={() => onChange(props.data.value)} // Pasar el valor al onChange
      />
      <label>{children}</label>
    </div>
  </components.Option>
);

export default CheckboxOptions;
