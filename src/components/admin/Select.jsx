export default function SelectComponent({
  selectLabel,
  options,
  value,
  name,
  onChange,
  placeholder = "Pick one",
  disabled = false,
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{selectLabel}</span>
      </div>
      <select
        className="select select-bordered"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        name={name}
      >
        <option disabled selected={!value}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
