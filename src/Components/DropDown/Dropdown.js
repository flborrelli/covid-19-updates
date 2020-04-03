import React, { useState } from 'react';
import './dropdown.css';
import { Dropdown } from 'semantic-ui-react';
import countriesNewData from '../../utils/countries';

function DropdownBox({ countrySelectApi }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e, result) => {
    e.preventDefault();
    const { value } = result || e.target;
    setInputValue(value);
    countrySelectApi(value)
  }

  return (
    <>
    <div className='dropdown-container'>
      <Dropdown
      className='dropdown-box'
      placeholder='Select Country'
      onChange={handleChange}
      search
      fluid
      selection 
      button={true}
      options={countriesNewData.map( (country) => ( {key: country.iso2, value: country.name, flag: country.iso2, text: country.name }))}
    />
  </div>
  </>

      
    
  );
}

export default DropdownBox;
