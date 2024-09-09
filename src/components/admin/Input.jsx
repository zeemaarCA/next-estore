export default function Input({ labelText, type, value, name, placeholder, className, onChange }) {
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
          className={className}
          onChange={onChange} // Trigger the passed onChange function
        />
      </label>
    </>
  );
}
