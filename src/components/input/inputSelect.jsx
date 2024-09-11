/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

// eslint-disable-next-line react/prop-types
const SelectInput = ({ label, value, disabled, options, handleSetValue }) => (
  <div className="mb-6">
    <label className="block text-gray-800 text-xs font-semibold mb-2">{label}</label>
    <select
      name={label}
      value={value || ''}
      disabled={disabled || false}
      onChange={(e) => handleSetValue(e.target.value)}
      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
    >
      <option value="">انتخاب کنید</option>
      {options.map((typeObj, index) => (
        <option key={index} value={typeObj.type}>
          {typeObj.title}
        </option>
      ))}
    </select>
  </div>
);
  
  
  export default SelectInput