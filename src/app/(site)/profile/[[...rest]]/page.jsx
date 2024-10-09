export const metadata = {
  title: "Profile",
  description: "View your profile and manage your account.",
};
import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";


export default function Profile() {
  return (
    <>
      <div className="link-container container text-center mt-24 mb-12">
        <ul className="flex flex-row justify-center gap-4 md:gap-8 bg-primary/10 dark:bg-primary/20 p-2 rounded-full max-w-max mx-auto relative">
          <Link href="/profile"><li className="bg-primary px-3 py-1 rounded-full text-white">Profile</li></Link>
          <Link href="/orders"><li className="px-3 py-1 rounded-full hover:bg-primary/20">Orders</li></Link>
          <Link href="/payments"><li className="px-3 py-1 rounded-full hover:bg-primary/20">Payments</li></Link>
        </ul>
      </div>
      <div className="container mb-10">
        <UserProfile />
      </div>
    </>
  )
}

