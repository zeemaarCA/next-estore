export const metadata = {
  title: "Payments",
  description: "View your payment history and manage your payments.",
};

import SectionTitle from "@components/SectionTitle";
import UserPayments from "@components/UserPayments";
import Link from "next/link";


export default function Payments() {
  return (
    <>
      <div className="link-container container text-center mt-24 mb-12">
        <ul className="flex flex-row justify-center gap-4 md:gap-8 bg-primary/10 dark:bg-primary/20 p-2 rounded-full max-w-max mx-auto relative">
          <Link href="/profile"><li className="px-3 py-1 rounded-full hover:bg-primary/20">Profile</li></Link>
          <Link href="/orders"><li className="px-3 py-1 rounded-full hover:bg-primary/20">Orders</li></Link>
          <Link href="/payments"><li className="bg-primary px-3 py-1 rounded-full text-white">Payments</li></Link>
        </ul>
      </div>
      <div className="container bg-white dark:bg-base-100 mb-24 pb-8 rounded-lg shadow-md relative text-center">
        <SectionTitle title="Payment History" className={"ml-4 !justify-center"} />
        <UserPayments />
      </div>
    </>
  )
}
