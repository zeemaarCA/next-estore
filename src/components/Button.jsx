export default function Button({
	className,
	type,
	onClick,
	disabled,
	buttonText,
	children,
}) {
	const defaultClasses = "btn-theme";
	return (
		<button
			className={`${defaultClasses} ${className}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children || buttonText}
		</button>
	);
}
