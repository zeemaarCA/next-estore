"use client";
import Link from "next/link";

export default function SectionTitle({title, link, linkText}) {
	return (
		<>
			<div className="head_title">
				<h1>{title}</h1>
				<Link className="btn-theme-outline" href={link}>{linkText}</Link>

			</div>
		</>
	);
}
