import { Inter } from "next/font/google";
import "./globals.css";
import "@styles/globals.css";
import "@styles/grid.css";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Loader from "@components/Loader";
import ThemeAndClerkProvider from "@components/ThemeAndClerkProvider";
import ReduxProvider from "@components/ReduxProvider";
// import { Toaster } from "react-hot-toast";
import {Toaster, toast} from "sonner";
import { Suspense } from "react";
import TopLoadingBar from "@components/TopLoadingBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: {
		default: "Decora Shop",
		template: "%s | Decora Shop",
	},
	description:
		"Decora Shop is a place where you can find all the products you need for your home.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<ReduxProvider>
					<ThemeAndClerkProvider>
						<TopLoadingBar>
							<ClerkLoading>
								<Loader />
							</ClerkLoading>
							<ClerkLoaded>
								<Toaster
									position="bottom-right"
									richColors
								/>
								<Suspense fallback={<Loader />}>
									<div className="flex-grow">{children}</div>
								</Suspense>
							</ClerkLoaded>
						</TopLoadingBar>
					</ThemeAndClerkProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
