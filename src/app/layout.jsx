import { Inter } from "next/font/google";
import "./globals.css";
import "@styles/globals.css";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
import ThemeAndClerkProvider from "@components/ThemeAndClerkProvider";
import ReduxProvider from "@components/ReduxProvider";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";

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
					<ClerkLoading>
						<Loader />
					</ClerkLoading>
					<ClerkLoaded>
						<div className="main">
							<div className="gradient" />
						</div>
						<Toaster
							position="bottom-right"
							toastOptions={{
								className: "",
								duration: 5000,
								style: {
									background: "#363636",
									color: "#fff",
								},
								success: {
									duration: 3000,
									theme: {
										primary: "green",
										secondary: "black",
									},
								},
							}}
						/>
						<Navbar />
						<div className="flex-grow">{children}</div>
						<Footer />
					</ClerkLoaded>
					</ThemeAndClerkProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
