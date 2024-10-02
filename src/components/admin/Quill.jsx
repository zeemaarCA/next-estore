import ReactQuill from "react-quill";

export default function Quill({ value, onchange, placeholder }) {
	return (
		<>
			<ReactQuill
				theme="snow"
				placeholder={placeholder}
				className="h-72 mb-12 text-slate-700 dark:text-slate-300"
				value={value}
				required
				onChange={onchange}
			/>
		</>
	);
}
