import Link from "next/link";

export default function Breadcrumbs({ base, parent, parentLink, child }) {
	return (
		<div className="breadcrumbs text-sm">
			<ul>
				<li>
					<Link href="/dsahboard">{base}</Link>
				</li>
				<li>
          <Link href={parentLink}>{parent}</Link>
				</li>
        <li>{child}</li>
			</ul>
		</div>
	);
}
