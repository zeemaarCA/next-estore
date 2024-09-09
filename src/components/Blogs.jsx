import SectionTitle from "./SectionTitle";
import SingleBlog from "./SingleBlog";

export default function Blogs() {
	return (
		<>
			<section className="py-24 ">
				<div className="mx-auto container px-8 md:px-0">
					<SectionTitle
						title="Latest Blogs"
						linkText="Show more"
						link="/blogs"
					/>
					<div className="flex justify-center  gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
						<SingleBlog />
					</div>
				</div>
			</section>
		</>
	);
}
