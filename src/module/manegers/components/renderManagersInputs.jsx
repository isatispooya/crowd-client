/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export const renderInputs = (
  inputKey,        
  label,          
  inputType,       
  field,       
  setField,    
  options = [],    
  disabled = false 
) => (
  <div className="mb-6">
    <label className="block text-right text-gray-700 text-sm font-medium mb-2">{label}:</label>
    
    {inputType === 'select' ? (
      <select
        value={field[inputKey]}
        onChange={(e) =>
            setField({
            ...field,
            [inputKey]: e.target.value,
          })
        }
        disabled={disabled}
        className="block w-full border rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={inputType}
        value={field[inputKey]}
        onChange={(e) =>
            setField({
            ...field,
            [inputKey]: e.target.value,
          })
        }
        disabled={disabled}
        className="block w-full border rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);
