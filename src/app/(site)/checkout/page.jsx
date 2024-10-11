export const metadata = {
	title: "Checkout",
	description: "Fill the form to checkout.",
};

import CheckoutDetails from "@components/checkout/CheckoutDetails";
import CheckoutForm from "@components/checkout/CheckoutForm";
import SectionTitle from "@components/SectionTitle";
import { fetchedUser } from "@utils/actions/user";
import { auth, currentUser } from "@clerk/nextjs/server";
import ShopSteps from "@components/ShopSteps";

export default async function Checkout() {

	const user = await currentUser();
	const { userId } = auth();

	if (userId) {
		// Query DB for user specific information or display assets only to signed in users
	}
	const userDataForRedux = await fetchedUser(user.id);


	return (
		<>
			{/* checkout page */}
			<section className="container mb-10">
				<ShopSteps currentStep={2} />
				<SectionTitle title="Checkout" />
				<div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Left Side: Checkout Form */}
					<CheckoutForm userDataForRedux={userDataForRedux} />
					{/* Right Side: Cart Details */}
					<div className="bg-invert p-6 shadow-md rounded-lg">
						<div>
							<CheckoutDetails />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
