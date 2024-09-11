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
import { useUser } from "@clerk/clerk-react";
import { fetchCart } from "@utils/actions/data";
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
import { signInSuccess, signoutSuccess } from "@redux/user/userSlice";
import { useEffect } from "react";

export default function Navbar() {
	const { isSignedIn, user, isLoaded } = useUser();
	const { session } = useSession();
	const userRole = checkUserRole(session);
	const totalQuantity = useSelector(selectTotalQuantity);
	const currentUser = useSelector(state => state.user.currentUser);


	const { theme } = useTheme();
	const logo = theme === "dark" ? logoDark : logoLight;
	const dispatch = useDispatch();

// store user data in redux
useEffect(() => {
    if (isSignedIn && user && !currentUser) {
      const userData = {
        id: user.id,
        fullName: user.fullName,
        emailAddress: user.emailAddresses[0].emailAddress,
        username: user.username,
        imageUrl: user.imageUrl,
      };
      dispatch(signInSuccess(userData));
    }
  }, [isSignedIn, user, dispatch, currentUser]);

	useEffect(() => {
		if(!isSignedIn && currentUser) {
			dispatch(signoutSuccess());
			dispatch(clearCart());
		}
	}, [isSignedIn, currentUser, dispatch]);
	// store user data in redux

	// fetch cart data from server
	useEffect(() => {
		if (isSignedIn && user) {
			fetchCart(user.id).then((cart) => {
				if (cart) {
					// console.log("cart", cart.items);
					dispatch(setCartItems(cart.items));				}
			});
		}
	}, [isSignedIn, user, dispatch]);

	// console.log("Current user from Redux:", currentUser);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "Shop", href: "/shop" },
		{
			name: "Categories",
			href: "#",
			subLinks: [
				{ name: "Satim Kachmina", slug: "satim-kachmina" },
				{ name: "Cushions", slug: "cushions" },
				{ name: "Lamps", slug: "lamps" },
			],
		},
		{ name: "About", href: "/about" },
		{ name: "Blogs", href: "/blogs" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<div className="navbar container mx-auto bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn lg:hidden">
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
													<Link href={`/categories/${subLink.slug}`}>
														{subLink.name}
													</Link>
												</li>
											))}
										</ul>
									</>
								) : (
									<Link href={link.href}>{link.name}</Link>
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
								<details>
									<summary>{link.name}</summary>
									<ul className="p-2 w-max z-10">
										{link.subLinks.map((subLink) => (
											<li key={subLink.slug}>
												<Link href={`/categories/${subLink.slug}`}>
													{subLink.name}
												</Link>
											</li>
										))}
									</ul>
								</details>
							) : (
								<Link href={link.href}>{link.name}</Link>
							)}
						</li>
					))}
					{userRole === "org:admin" && (
						<li>
							<Link href="/dashboard" className="bg-invert">
								<MdOutlineAdminPanelSettings className="w-4 h-4" /> Admin
							</Link>
						</li>
					)}
				</ul>
			</div>
			<div className="navbar-end gap-4">
				<ThemeToggle />
				<div className="relative">
					<Link href="/cart">
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
	);
}
