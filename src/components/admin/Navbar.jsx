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
import { useRouter } from "next/navigation"; // Correct import for App Router
import { useUser } from "@clerk/clerk-react";
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
import logoLight from "../../../public/assets/logo-light.svg";
import logoDark from "../../../public/assets/logo-dark.svg";
import { signInStart, signInSuccess, signoutSuccess } from "@redux/user/userSlice";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Navbar() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { isSignedIn, user, isLoaded } = useUser();
	const { session } = useSession();
	const userRole = checkUserRole(session);
	const totalQuantity = useSelector(selectTotalQuantity);
	const currentUser = useSelector(state => state.user.currentUser);

	const { theme } = useTheme();
	const logo = theme === "dark" ? logoDark : logoLight;
	const dispatch = useDispatch();






	useEffect(() => {
		if (!isSignedIn && currentUser) {
			dispatch(signoutSuccess());
			dispatch(clearCart());
		}
	}, [isSignedIn, currentUser, dispatch]);


	return (
		<>
			{loading && <div className="loading-spinner">Loading...</div>}
			<div className="navbar bg-white dark:bg-base-100 fixed z-50 border-b border-slate-200 dark:border-slate-700">
				<div className="navbar-start">
					<Link href="/" className="select-none">
						<Image priority src={logo} height={50} width={125} alt="logo" />
					</Link>
				</div>
				<div className="navbar-end gap-4">
					{/* <input type="text" placeholder="Search..." className="input input-bordered input-md w-full max-w-xs" /> */}
					<Link href="/" className="btn btn-warning btn-sm">Exit Dashboard</Link>
					<ThemeToggle />
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
		</>
	);
}
