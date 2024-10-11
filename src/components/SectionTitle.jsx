"use client";
import Link from "next/link";

export default function SectionTitle({ title, link, linkText, className }) {
	return (
		<>
			<div className={`head_title container flex items-center justify-between ${className}`}>
				<h1>{title}</h1>
				{link && linkText && (
					<Link className="btn-theme-outline" href={link}>
						{linkText}
					</Link>
				)}
			</div>
		</>
	);
}
