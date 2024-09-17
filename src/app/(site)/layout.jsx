import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import ThemeAndClerkProvider from "@components/ThemeAndClerkProvider";

export default function SiteLayout({ children }) {
  return (

      <ClerkLoaded>
        <Navbar />
        <div className="main">
          <div className="gradient" />
        </div>
        <Suspense fallback={<Loader />}>
          <div className="flex-grow">{children}</div>
        </Suspense>
        <Footer />

      </ClerkLoaded>
  );
}
