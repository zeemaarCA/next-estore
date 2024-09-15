export const metadata = {
	title: "Checkout",
	description: "Fill the form to checkout.",
};

import CheckoutDetails from "@components/checkout/CheckoutDetails";
import CheckoutForm from "@components/checkout/CheckoutForm";
import SectionTitle from "@components/SectionTitle";

export default async function Checkout() {
	return (
		<>
			{/* checkout page */}
			<section className="container mx-auto px-4 my-10">
				<SectionTitle title="Checkout" />
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Left Side: Checkout Form */}
					<CheckoutForm />
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
