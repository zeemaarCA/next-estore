"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoBagCheck, IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { PiUsersFourDuotone } from "react-icons/pi";
import { FaBox } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
	const [openMenu, setOpenMenu] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleMenu = (title) => {
		setOpenMenu(openMenu === title ? null : title);
	};

	const navLinks = [
		{
			title: "Dashboard",
			icon: <MdDashboard className="w-5 h-5" />,
			href: "/dashboard",
		},
		{
			title: "Products",
			icon: <FaBox className="w-5 h-5" />,
			href: "#",
			subLinks: [
				{
					title: "All Products",
					href: "/dashboard/products-list",
				},
				{
					title: "Add Product",
					href: "/dashboard/add-product",
				},
				{
					title: "Categories",
					href: "/dashboard/categories",
				},
				{
					title: "Brands",
					href: "#",
				},
				{
					title: "Collections",
					href: "#",
				},
			],
		},
		{
			title: "Orders",
			icon: <IoBagCheck className="w-5 h-5" />,
			href: "/dashboard/orders",
		},
		{
			title: "Payments",
			icon: <MdOutlinePayment className="w-5 h-5" />,
			href: "/dashboard/payments",
		},
		{
			title: "Customers",
			icon: <PiUsersFourDuotone className="w-5 h-5" />,
			href: "/dashboard/customers",
		},
		{
			title: "Blog Posts",
			icon: <IoDocumentTextOutline className="w-5 h-5" />,
			href: "/dashboard/blogs-list",
		},
	];

	return (
		<>
			<div className="flex justify-end pr-4">
				<button
					data-drawer-target="sidebar-multi-level-sidebar"
					data-drawer-toggle="sidebar-multi-level-sidebar"
					aria-controls="sidebar-multi-level-sidebar"
					type="button"
					className={`btn-theme mt-12 sm:!hidden`}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					<span className="sr-only">Open sidebar</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							fillRule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
						/>
					</svg>
				</button>
			</div>
			<aside
				id="sidebar-multi-level-sidebar"
				className={`fixed bottom-0 left-0 z-40 w-64 h-[calc(100vh-65px)] transition-transform -translate-x-full sm:translate-x-0 ${
					isSidebarOpen ? "translate-x-0" : ""
				}`}
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-base-100 border-r border-slate-200 dark:border-slate-700">
					<ul className="font-medium pl-0">
						{navLinks.map((link) => (
							<li key={link.title} className="py-2 list-none select-none">
								<Link href={link.href} className={`flex items-center justify-between p-2 cursor-pointer text-slate-700 rounded-lg dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${
										openMenu === link.title ? "block" : ""
									}`} onClick={() => toggleMenu(link.title)}>
									<span className="flex items-center gap-2">
										{link.icon}
										{link.title}
									</span>
									{link.subLinks && (
										<svg
											className={`w-6 h-6 transition-transform ${
												openMenu === link.title ? "transform rotate-180" : ""
											}`}
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												clipRule="evenodd"
												fillRule="evenodd"
												d="M6 9l4 4 4-4"
											/>
										</svg>
									)}
								</Link>
								{link.subLinks && (
									<ul
										className={`mt-2 space-y-2 ml-4 pl-4 ${
											openMenu === link.title ? "block" : "hidden"
										}`}
									>
										{link.subLinks.map((subLink) => (
											<Link
												key={subLink.title}
												href={subLink.href}
												className="block p-2 text-sm text-slate-500 rounded-lg dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
											>
												<li>{subLink.title}</li>
											</Link>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</div>
			</aside>
			<div className="p-4 sm:ml-64"></div>
		</>
	);
}
