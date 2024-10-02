import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
import Footer from "@components/Footer";
import { Suspense } from "react";

export default function SiteLayout({ children }) {
  return (

    <ClerkLoaded>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="main">
          <div className="gradient" />
        </div>
        <Suspense fallback={<Loader />}>
          <div className="flex-grow">{children}</div>
        </Suspense>
        <Footer />
      </div>

    </ClerkLoaded>
  );
}
