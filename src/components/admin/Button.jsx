export default function Button({ className, type, onClick, disabled, buttonText, children }) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children || buttonText}
    </button>
  );
}
