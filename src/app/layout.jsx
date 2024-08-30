import { Inter } from "next/font/google";
import "./globals.css";
import "@styles/globals.css";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Next Store - Next.js",
    template: "%s | Next Store - Next.js",
  },
  description: "Discover and share creative prompts for writing, drawing, and more.",
};

export default function RootLayout({
	children,
}) {
	return (
		<ClerkProvider>
			<html data-theme="light" lang="en">
				<body className={inter.className}>
					<ClerkLoading>
						<Loader />
					</ClerkLoading>
					<ClerkLoaded>
            <Navbar />
            {children}
          </ClerkLoaded>
				</body>
			</html>
		</ClerkProvider>
	);
}
