"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import logoLight from "../../public/assets/logo-light.svg";
import logoDark from "../../public/assets/logo-dark.svg";

export default function Loader() {
  const { theme } = useTheme();

	const logo = theme === "dark" ? logoDark : logoLight;
	return (
		<div className="min-h-screen flex justify-center items-center flex-col">
			<Image src={logo} alt="Logo" width={200} height={100} />
			<span className="loading loading-infinity text-primary loading-lg"></span>
		</div>
	);
}
