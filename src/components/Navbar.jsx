"use client";

import Link from "next/link";
import Image from "next/image";
import { checkUserRole } from "@utils/userUtils";
import { FaRegUser } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { useTheme } from "next-themes";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { ThemeToggle } from "@components/ThemeToggle";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation"; // Correct import for App Router
import { useUser } from "@clerk/clerk-react";
import { fetchCart } from "@utils/actions/cart";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	useSession,
} from "@clerk/nextjs";
import {
	clearCart,
	setCartItems,
	selectTotalQuantity,
} from "@redux/cart/cartSlice";
import logoLight from "../../public/assets/logo-light.svg";
import logoDark from "../../public/assets/logo-dark.svg";
import { signInStart, signInSuccess, signoutSuccess } from "@redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { setPromo } from "@redux/promo/promoSlice";

export default function Navbar() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { isSignedIn, user, isLoaded } = useUser();
	const { session } = useSession();
	const userRole = checkUserRole(session);
	const totalQuantity = useSelector(selectTotalQuantity);
	const currentUser = useSelector(state => state.user.currentUser);
	const [isOpen, setIsOpen] = useState(false);

	// Create a reference for the details element
	const detailsRef = useRef(null);

	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = () => {
		setIsOpen(false);
		if (detailsRef.current) {
			detailsRef.current.removeAttribute('open'); // Remove the open attribute
		}
	};




	const { theme } = useTheme();
	const logo = theme === "dark" ? logoDark : logoLight;
	const dispatch = useDispatch();

	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true);
		const handleRouteChangeComplete = () => setLoading(false);

		router.events?.on('routeChangeStart', handleRouteChangeStart);
		router.events?.on('routeChangeComplete', handleRouteChangeComplete);
		router.events?.on('routeChangeError', handleRouteChangeComplete);

		return () => {
			router.events?.off('routeChangeStart', handleRouteChangeStart);
			router.events?.off('routeChangeComplete', handleRouteChangeComplete);
			router.events?.off('routeChangeError', handleRouteChangeComplete);
		};
	}, [router]);


	const pathname = usePathname();

	const isLinkActive = (href) => {
		if (href === '/') {
			return pathname === href;
		}
		return pathname.startsWith(href);
	};

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (isSignedIn) {
				try {
					dispatch(signInStart());
					const response = await fetch(`/api/users/${user.id}`);
					const data = await response.json();
					dispatch(signInSuccess(data));
					// ... rest of the code
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			} else {
				console.log("Conditions not met for fetching user details.");
			}
		};

		fetchUserDetails();
	}, [dispatch, user]);


	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const redirectStatus = params.get("redirect_status");

		// Check for 'succeeded' in the redirect status to clear cart
		if (redirectStatus === "succeeded") {
			dispatch(clearCart());
		}

		// Handle signout case
		if (!isSignedIn && currentUser) {
			dispatch(signoutSuccess());
			dispatch(clearCart());
		}
	}, [isSignedIn, currentUser, dispatch]);

	// Fetch cart data from server
	useEffect(() => {
		if (isSignedIn && user) {
			fetchCart(user.id).then((cart) => {
				if (cart) {
					dispatch(setCartItems(cart.items));
					dispatch(setPromo({
						isPromoApplied: cart.isPromoApplied,
						discount: cart.discount,
					}));
				}
			});
		}
	}, [isSignedIn, user, dispatch]);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Shop", href: "/shop" },
		{
			name: "Categories",
			href: "#",
			subLinks: [
				{ name: "Camera", slug: "camera" },
				{ name: "Charger", slug: "charger" },
				{ name: "Speaker", slug: "speaker" },
				{ name: "Monitor", slug: "monitor" },
			],
		},
		{ name: "About", href: "/about" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<>
			{loading && <div className="loading-spinner">Loading...</div>}
			<div className="bg-invert relative z-10">
				<div className="navbar container">
					<div className="navbar-start">
						<div className="dropdown">
							<div tabIndex={0} role="button" className="btn lg:hidden mr-[10px]">
								<HiMenuAlt1 />
							</div>
							<ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
								{navLinks.map((link) => (
									<li key={link.name}>
										{link.subLinks ? (
											<>
												<a>{link.name}</a>
												<ul className="p-2">
													{link.subLinks.map((subLink) => (
														<li key={subLink.slug}>
															<Link
																href={`/categories/${subLink.slug}`}
																className={isLinkActive(`/categories/${subLink.slug}`) ? 'active-link' : ''}
															>
																{subLink.name}
															</Link>
														</li>
													))}
												</ul>
											</>
										) : (
											<Link
												href={link.href}

												className={isLinkActive(link.href) ? 'active-link' : ''}
											>
												{link.name}
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
						<Link href="/" className="select-none">
							<Image priority src={logo} height={50} width={125} alt="logo" />
						</Link>
					</div>
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1">
							{navLinks.map((link) => (
								<li key={link.name}>
									{link.subLinks ? (
										<details open={isOpen} ref={detailsRef}>
											<summary onClick={handleDropdownClick} className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 active:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-900 dark:focus:bg-slate-900">{link.name}</summary>
											<ul className="p-2 w-max z-10 bg-slate-50 dark:bg-slate-800">
												{link.subLinks.map((subLink) => (
													<li key={subLink.slug} className="max-w-max">
														<Link href={`/categories/${subLink.slug}`}
															className={`${isLinkActive(`/categories/${subLink.slug}`) ? 'active-link' : ''} hover:bg-slate-100 active:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-900 dark:focus:bg-slate-900`}
															onClick={closeDropdown} // Close the dropdown on link click
														>
															{subLink.name}
														</Link>
													</li>
												))}
												<li><Link href="/categories"
													className="hover:bg-slate-100 active:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-900 dark:focus:bg-slate-900"
													onClick={closeDropdown}>All Categories</Link></li>
											</ul>
										</details>
									) : (
										<Link
											href={link.href}

											className={`${isLinkActive(link.href) ? 'active-link' : ''} hover:bg-slate-100 active:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-900 dark:active:bg-slate-900 dark:focus:bg-slate-900`}
										>
											{link.name}
										</Link>
									)}
								</li>
							))}
							{userRole === "org:admin" && (
								<li>
									<Link
										href="/dashboard"
										className={`bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 ${isLinkActive('/dashboard') ? 'active-link' : ''}`}

									>
										<MdOutlineAdminPanelSettings className="w-4 h-4" /> Admin
									</Link>
								</li>
							)}
						</ul>
					</div>
					<div className="navbar-end gap-4">
						<ThemeToggle />
						<div className="relative">
							<Link href="/cart" prefetch={false}>
								<span className="absolute bg-invert h-5 w-5 flex justify-center items-center rounded-full -right-2 -top-2 select-none">
									{totalQuantity}
								</span>
								<PiShoppingCartDuotone className="cart-icon w-8 h-8" />
							</Link>
						</div>
						<SignedIn>
							<UserButton
								appearance={{
									elements: {
										avatarBox: {
											width: "32px",
											height: "32px",
										},
									},
								}}
								userProfileMode="navigation"
								userProfileUrl="/profile"
							/>
						</SignedIn>
						<SignedOut>
							<SignInButton>
								<button className="btn-theme flex gap-2">
									<FaRegUser />
									Sign in
								</button>
							</SignInButton>
						</SignedOut>
					</div>
				</div>
			</div>
		</>
	);
}
