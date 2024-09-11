"use client";
import Link from "next/link";

export default function SectionTitle({ title, link, linkText }) {
	return (
		<>
			<div className="head_title flex items-center justify-between">
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
