/* eslint-disable jsx-a11y/label-has-associated-control */

// eslint-disable-next-line react/prop-types
const Input = ({ label, value, disabled, setValue }) => {
  const handleSetValue = (newValue) => {
    setValue(newValue);
  };

  const handleCompanyNameKeyDown = (e) => {
    if (!/^[A-Za-z\u0600-\u06FF\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="mb-6">
      <label className="block text-gray-800 text-xs font-semibold mb-2">{label}</label>
      <input
        type="number"
        name={label}
        value={value || ''}
        disabled={disabled || false}
        onChange={(e) => handleSetValue(e.target.value)}
        onKeyDown={handleCompanyNameKeyDown}
        required
        className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
      />
    </div>
  );
};

export default Input;
