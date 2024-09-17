import { UserProfile } from "@clerk/nextjs";
import SectionTitle from "@components/SectionTitle";
import UserOrders from "@components/UserOrders";
import UserPayments from "@components/UserPayments";

export default function Profile() {
  return (
    <>
      <div className="container mx-auto px-4 pb-12 my-10 bg-white dark:bg-base-100 relative rounded-md">
        <SectionTitle title="Profile" />
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab checked:!text-primary checked:!font-medium !w-max"
            defaultChecked
            aria-label="Profile Settings" />
          <div role="tabpanel" className="tab-content bg-invert border-base-300 rounded-box p-6">
            <UserProfile />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab checked:!text-primary checked:!font-medium !w-max"
            aria-label="My Orders"
          />
          <div role="tabpanel" className="tab-content bg-invert border-base-300 rounded-box p-6">
            <UserOrders />
          </div>

          <input type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab checked:!text-primary checked:!font-medium !w-max"
            aria-label="My Payments" />
          <div role="tabpanel" className="tab-content bg-invert border-base-300 rounded-box p-6">
            <UserPayments />
          </div>
        </div>
      </div>
    </>
  )
}
