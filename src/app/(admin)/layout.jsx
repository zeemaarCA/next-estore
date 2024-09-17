import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Navbar from "@components/admin/Navbar";
import Loader from "@components/Loader";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";
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
        <Suspense fallback={<Loader />}>
          <div className="flex-grow pt-10">{children}</div>
        </Suspense>
      </ClerkLoaded>
    </>
  );
}