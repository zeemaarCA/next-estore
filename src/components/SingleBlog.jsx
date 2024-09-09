import Image from "next/image";
import blog1 from "../../public/assets/blogs/blog1.jpg";
import blog2 from "../../public/assets/blogs/blog2.jpg";
import blog3 from "../../public/assets/blogs/blog3.jpg";
export default function SingleBlog() {
	return (
		<>
			<div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
				<div className="flex items-center">
					<Image
						src={blog1}
						alt="blogs tailwind section"
						className="rounded-t-2xl w-full h-64"
					/>
				</div>
				<div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 dark:group-hover:bg-base-200">
					<span className="text-cgreen-500 dark:text-supernova-400 font-medium mb-3 block">
						Jan 01, 2023
					</span>
					<h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
						Clever ways to invest in product to organize your portfolio
					</h4>
					<p className="text-gray-500 leading-6 mb-10">
						Discover smart investment strategies to streamline and organize your
						portfolio..
					</p>
					<a
						href="javascript:;"
						className="cursor-pointer text-lg text-cgreen-500 dark:text-supernova-400 font-semibold"
					>
						Read more..
					</a>
				</div>
			</div>
			<div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
				<div className="flex items-center">
					<Image
						src={blog2}
						alt="blogs tailwind section"
						className="rounded-t-2xl w-full h-64"
					/>
				</div>
				<div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 dark:group-hover:bg-base-200">
					<span className="text-cgreen-500 dark:text-supernova-400 font-medium mb-3 block">
						Feb 01, 2023
					</span>
					<h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
						How to grow your profit through systematic investment with us
					</h4>
					<p className="text-gray-500 leading-6 mb-10">
						Unlock the power of systematic investment with us and watch your
						profits soar. Our..
					</p>
					<a
						href="javascript:;"
						className="cursor-pointer text-lg text-cgreen-500 dark:text-supernova-400 font-semibold"
					>
						Read more..
					</a>
				</div>
			</div>
			<div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
				<div className="flex items-center">
					<Image
						src={blog3}
						alt="blogs tailwind section"
						className="rounded-t-2xl w-full h-64"
					/>
				</div>
				<div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50 dark:group-hover:bg-base-200">
					<span className="text-cgreen-500 dark:text-supernova-400 font-medium mb-3 block">
						Mar 01, 20233
					</span>
					<h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
						How to analyze every holdings of your portfolio
					</h4>
					<p className="text-gray-500 leading-6 mb-10">
						Our comprehensive guide will equip you with the tools and insights
						needed to..
					</p>
					<a
						href="javascript:;"
						className="cursor-pointer text-lg text-cgreen-500 dark:text-supernova-400 font-semibold"
					>
						Read more..
					</a>
				</div>
			</div>
		</>
	);
}
