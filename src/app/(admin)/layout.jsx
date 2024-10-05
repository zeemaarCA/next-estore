import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@components/admin/Navbar";
import Loader from "@components/Loader";
import Footer from "@components/Footer";
import { Toaster, toast } from "sonner";
import { Suspense } from "react";

export default function SiteLayout({ children }) {
  return (
    <>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <Toaster
          position="bottom-right"
          richColors
        />
        <Navbar />
        <Suspense fallback={<Loader />}>
          <div className="flex-grow pt-10">{children}</div>
        </Suspense>
      </ClerkLoaded>
    </>
  );
}