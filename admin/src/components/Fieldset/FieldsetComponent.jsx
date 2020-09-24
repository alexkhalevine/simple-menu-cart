import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Fieldset = ({
  name,
  type,
  value,
  onChange,
  onBlur,
  isArea,
  isDropdown,
  dropdownOptions
}) => {
  if (isArea) {
    return (
      <fieldset>
        <label htmlFor={name}>{name}</label>
        <textarea cols="30" rows="2" className={name} placeholder={name} id={name} name={name} type="text" value={value} onChange={onChange} onBlur={onBlur} />
      </fieldset>
    )
  }

  if (isDropdown) {
    return (
      <fieldset>
        <label htmlFor={name}>{name}</label>
        <Dropdown
          id={name}
          name={name}
          floating
          defaultValue={value}
          options={dropdownOptions}
          onChange={onChange}
        />
      </fieldset>
    )
  }

  return (
    <fieldset>
      <label htmlFor={name}>{name}</label>
      <input className={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} />
    </fieldset>
  )
}

export default Fieldset;
