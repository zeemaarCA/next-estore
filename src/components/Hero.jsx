import Link from "next/link";
import banner from "../../public/assets/banner/banner.jpg";
import Image from "next/image";

export default function Hero() {
	return (
		<>
			<section className="relative flex items-center justify-center border-b">
				<div className="relative items-center w-full py-12 lg:py-20">
					<div className="text-center">
						<span className="badge-theme">
							Ultimate Shopping Experience
						</span>

						<h1 className="text-gray-600 dark:text-gray-300 mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
							Summer Collection{" "}
							<span className="block text-primary">Now Available.</span>
						</h1>

						<p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
							Explore our collection of summer clothing and accessories. Get
							your hands on the latest trends and styles with Decora.
						</p>
						<div className="flex items-center gap-x-5 w-full justify-center mt-5 relative z-10">
							<Link href="/shop" className="btn-theme">
								Shop Now
								<svg
									className="w-5 h-5 ml-2 -mr-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
							<Link href="/shop" className="btn-theme-outline">
								Contact
							</Link>
						</div>
					</div>

					<div className="relative items-center w-full py-12 mx-auto mt-12">
						<svg
							className="absolute -mt-24 blur-3xl"
							fill="none"
							viewBox="0 0 400 400"
							height="100%"
							width="100%"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#clip0_10_20)">
								<g filter="url(#filter0_f_10_20)">
									<path
										d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
										fill="#03FFE0"
									></path>
									<path
										d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
										fill="#7C87F8"
									></path>
									<path
										d="M320 400H400V78.75L106.2 134.75L320 400Z"
										fill="#4C65E4"
									></path>
									<path
										d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
										fill="#043AFF"
									></path>
								</g>
							</g>
							<defs>
								<filter
									colorInterpolationFilters="sRGB"
									filterUnits="userSpaceOnUse"
									height="720.666"
									id="filter0_f_10_20"
									width="720.666"
									x="-160.333"
									y="-160.333"
								>
									<feFlood
										floodOpacity="0"
										result="BackgroundImageFix"
									></feFlood>
									<feBlend
										in="SourceGraphic"
										in2="BackgroundImageFix"
										mode="normal"
										result="shape"
									></feBlend>
									<feGaussianBlur
										result="effect1_foregroundBlur_10_20"
										stdDeviation="80.1666"
									></feGaussianBlur>
								</filter>
							</defs>
						</svg>

						<Image
              src={banner}
              alt="Hero image"
              priority
              className="relative object-cover w-full max-w-screen-lg mx-auto border rounded-lg shadow-2xl lg:rounded-2xl"
            />
					</div>
				</div>
			</section>
		</>
	);
}
