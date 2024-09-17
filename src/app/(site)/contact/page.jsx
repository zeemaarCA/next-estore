export const metadata = {
	title: "Contact Us",
	description: "Contact us for any queries or feedback.",
};
import { motion } from "framer-motion"
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import { MdOutlineCall, MdOutlineMail, MdLocationPin } from "react-icons/md";
import { MapProvider } from "@utils/map-provider";
import { MapComponent } from "@components/MapComponent";

export default function Contact() {
	return (

		<div className="min-h-screen">
			{/* Contact Banner */}
			<div className="bg-invert py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
						Contact Us
					</h1>
					<p className="mt-6 text-xl max-w-3xl mx-auto">
						We&apos;re here to help and answer any question you might have. We
						look forward to hearing from you.
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					{/* Contact Information */}
					<div className="bg-primary/20 rounded-lg shadow-md p-6 z-[1]">
						<h2 className="text-2xl font-bold invert-gray-text mb-6">
							Get in Touch
						</h2>
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<div className="bg-primary rounded-full p-3">
										<MdOutlineMail className="h-6 w-6 text-white" />
									</div>
								</div>
								<div className="ml-4">
									<p className="text-lg font-medium invert-gray-text">Email</p>
									<p className="invert-gray-text">contact@example.com</p>
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<div className="bg-primary rounded-full p-3">
										<MdOutlineCall className="h-6 w-6 text-white" />
									</div>
								</div>
								<div className="ml-4">
									<p className="text-lg font-medium invert-gray-text">Phone</p>
									<p className="invert-gray-text">+1 (555) 123-4567</p>
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<div className="bg-primary rounded-full p-3">
										<MdLocationPin className="h-6 w-6 text-white" />
									</div>
								</div>
								<div className="ml-4">
									<p className="text-lg font-medium invert-gray-text">
										Location
									</p>
									<p className="invert-gray-text">123 Main St, City, Country</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-primary/20 rounded-lg shadow-md p-6 z-[1]">
						<h2 className="text-2xl font-bold invert-gray-text mb-6">
							Send us a Message
						</h2>
						<form className="space-y-4">
							<div>
								<Input
									labelText="Full Name"
									type="text"
									id="fullName"
									name="fullName"
									className=""
									required
								/>
							</div>
							<div>
								<Input
									labelText="Email"
									type="email"
									id="email"
									name="email"
									className=""
									required
								/>
							</div>
							<div>
								<Input
									labelText="Subject"
									type="text"
									id="subject"
									name="subject"
									className=""
									required
								/>
							</div>
							<div>
								<Textarea
									labelText="Message"
									id="message"
									name="message"
									rows={4}
									className=""
									required
								></Textarea>
							</div>
							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								>
									Send Message
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Map Section */}
				<div className="bg-invert rounded-lg shadow-md">
					<h2 className="text-2xl font-bold invert-gray-text mb-6">
						Our Location
					</h2>
          <div className="aspect-w-16 aspect-h-9">
            {/* Placeholder for the map
            card is not being accepted in google
						<div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
							<MapProvider>
								<MapComponent />
              </MapProvider>
						</div> */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d107828.97831998898!2d74.4030208!3d32.37478399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1726059384101!5m2!1sen!2s" width="100%" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</div>
		</div>
	);
}
