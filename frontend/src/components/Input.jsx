const Input = ({ icon: Icon, type, placeholder, value, onChange }) => {
  return (
    <div className="relative mb-4">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
      <input
        className="pl-10 pr-4 py-3 w-full bg-gray-700 text-white rounded-lg focus:outline-none"
        type={type}
        placeholder={placeholder}
        value={value}   // Pass value correctly
        onChange={onChange}  // Pass onChange correctly
      />
    </div>
  );
};

export default Input;
