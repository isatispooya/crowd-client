/* eslint-disable jsx-a11y/label-has-associated-control */

// eslint-disable-next-line react/prop-types
const InputPercent = ({ label, value, disabled, setValue }) => {
  // const handleSetValue = (newValue) => {
  //   if (newValue > 100) {
  //     setValue(100);
  //   } else if (newValue < 0) {
  //     setValue(0);
  //   } else {
  //     setValue(newValue);
  //   }
  // };
  return (
    <div className="mb-6 relative">
      <label className="block text-gray-800 text-xs font-semibold mb-2">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">% </span>
        <input
          type="number"
          name={label}
          // value={value || ''}
          disabled={disabled || false}
          // onChange={(e) => handleSetValue(e.target.value)}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, '');
            if (e.target.value.split('.').length > 2) {
              e.target.value = e.target.value.slice(0, -1);
            }
          }}
          className="shadow bg-white appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 pl-8 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
        />
      </div>
    </div>
  );
};

export default InputPercent;
