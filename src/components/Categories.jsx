"use client";
import Image from "next/image";
import carpet from "../../public/assets/categories/carpet.jpg";
import lamp from "../../public/assets/categories/lamp.jpg";
import cushion from "../../public/assets/categories/cushion.jpg";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

export default function Categories() {
	return (
		<>
			<div className="">
				<SectionTitle
					title="Categories"
					linkText="Show more"
					link="/categories"
				/>
				<div className="grid grid-cols-12 grid-rows-6 gap-4">
					<div className="relative col-span-12 sm:col-span-6 lg:col-span-6 lg:row-span-6 h-[350px] lg:h-[720px]">
						<Link href="/shop">
							<Image
								className="w-full rounded-md h-full"
								src={cushion}
								alt="cushion"
								width={300}
								height={300}
							/>
							<div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
							<div className="absolute inset-0 flex items-center justify-center">
								<h2 className="text-white text-3xl font-bold">Cushions</h2>
							</div>
						</Link>
					</div>
					<div className="relative col-span-12 sm:col-span-6 lg:col-span-6 lg:row-span-3 lg:col-start-7">
						<Link href="/shop">
							<Image
								className="w-full rounded-md h-[350px]"
								src={carpet}
								alt="carpet"
								width={400}
								height={300}
							/>
							<div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
							<div className="absolute inset-0 flex items-center justify-center">
								<h2 className="text-white text-3xl font-bold">Carpets</h2>
							</div>
						</Link>
					</div>
					<div className="relative col-span-12 sm:col-span-6 lg:col-span-6 lg:row-span-3 lg:col-start-7 lg:row-start-4">
						<Link href="/shop">
							<Image
								className="w-full rounded-md h-[350px]"
								src={lamp}
								alt="lamp"
								width={400}
								height={300}
							/>
							<div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
							<div className="absolute inset-0 flex items-center justify-center">
								<h2 className="text-white text-3xl font-bold">Lamps</h2>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
