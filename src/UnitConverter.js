import React, { useState } from 'react';
import './unit.css';
const ConversionTypes = {
  length: {
    units: [
      { label: 'Millimeter', value: 0.001 },
      { label: 'Centimeter', value: 0.01 },
      { label: 'Meter', value: 1 },
      { label: 'Kilometer', value: 1000 },
      { label: 'Inch', value: 0.0254 },
      { label: 'Foot', value: 0.3048 },
      { label: 'Yard', value: 0.9144 },
      { label: 'Mile', value: 1609.34 },
    ],
  },
  temperature: {
    units: [
      { label: 'Celsius', value: 'C' },
      { label: 'Fahrenheit', value: 'F' },
      { label: 'Kelvin', value: 'K' },
    ],
  },
  weight: {
    units: [
      { label: 'Gram', value: 0.001 },
      { label: 'Kilogram', value: 1 },
      { label: 'Pound', value: 0.453592 },
      { label: 'Ounce', value: 0.0283495 },
    ],
  },
  volume: {
    units: [
      { label: 'Milliliter', value: 0.001 },
      { label: 'Liter', value: 1 },
      { label: 'Cubic Meter', value: 1000 },
      { label: 'Gallon', value: 3.78541 },
      { label: 'Fluid Ounce', value: 0.0295735 },
    ],
  },
};

function UnitConverter() {
  const [conversionType, setConversionType] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleConversionTypeChange = (event) => {
    const type = event.target.value;
    setConversionType(type);
    setFromUnit('');
    setToUnit('');
    setInputValue('');
    setOutputValue('');
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleFromUnitChange = (event) => {
    const unit = event.target.value;
    setFromUnit(unit);
    convert(inputValue, unit, toUnit);
  };

  const handleToUnitChange = (event) => {
    const unit = event.target.value;
    setToUnit(unit);
    convert(inputValue, fromUnit, unit);
  };

  const convert = (value, from, to) => {
    if (value === '' || from === '' || to === '') {
      setOutputValue('');
      return;
    }

    const conversionTypeData = ConversionTypes[conversionType];
    const fromUnitValue = conversionTypeData.units.find((unit) => unit.label === from).value;
    const toUnitValue = conversionTypeData.units.find((unit) => unit.label === to).value;

    const result = (parseFloat(value) * fromUnitValue) / toUnitValue;
    setOutputValue(result.toFixed(2));
  };

  return (
   <div className='main'>
    <div className="converter-container">
    <h1 className="converter-heading">Unit Converter</h1>
    <div className="select-container">
      <label className="select-label">
        Conversion Type:
        <select
          className="select-input"
          value={conversionType}
          onChange={handleConversionTypeChange}
        >
          {Object.keys(ConversionTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div className="conversion-container">
      <div className="conversion-row">
        <label className="conversion-label">
          From:
          <select className="conversion-select" value={fromUnit} onChange={handleFromUnitChange}>
            <option value="">Select Unit</option>
            {ConversionTypes[conversionType].units.map((unit) => (
              <option key={unit.label} value={unit.label}>
                {unit.label}
              </option>
            ))}
          </select>
        </label>
        <label className="conversion-label">
          To:
          <select className="conversion-select" value={toUnit} onChange={handleToUnitChange}>
            <option value="">Select Unit</option>
            {ConversionTypes[conversionType].units.map((unit) => (
              <option key={unit.label} value={unit.label}>
                {unit.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="conversion-row">
        <label className="conversion-label">
          Input Value:
          <input
            className="conversion-input"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <label className="conversion-label">
          Output Value:
          <input className="conversion-input" type="text" value={outputValue} readOnly />
        </label>
      </div>
    </div>
  </div>
  </div>
  
  );
}

export default UnitConverter;

