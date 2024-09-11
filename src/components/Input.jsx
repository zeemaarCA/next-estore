export default function Input({
  labelText,
  type = "text",
  value,
  name,
  placeholder,
  className = "",
  onChange,
  disabled,
}) {
  // Default Tailwind classes for the input
  const defaultClasses = "input w-full invert-gray-text";

  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{labelText}</span>
        </div>
        <input
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          className={`${defaultClasses} ${className}`} // Combine default and custom classes
          onChange={onChange}
          disabled={disabled}
        />
      </label>
    </>
  );
}
