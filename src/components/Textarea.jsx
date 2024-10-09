export default function Textarea({
  labelText,
  value,
  defaultValue = "",
  name,
  rows,
  placeholder,
  className = "",
  onChange,
}) {
  // Default Tailwind classes for the input
  const defaultClasses = "textarea w-full";

  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{labelText}</span>
        </div>
        <textarea
          value={value}
          defaultValue={defaultValue}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={`${defaultClasses} ${className}`} // Combine default and custom classes
          onChange={onChange}
        />
      </label>
    </>
  );
}
