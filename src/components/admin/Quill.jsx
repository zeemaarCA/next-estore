import ReactQuill from "react-quill";

export default function Quill({ value, onchange, placeholder }) {
	return (
		<>
			<ReactQuill
				theme="snow"
				placeholder={placeholder}
				className="h-72 mb-12 text-gray-700 dark:text-gray-300"
				value={value}
				required
				onChange={onchange}
			/>
		</>
	);
}
