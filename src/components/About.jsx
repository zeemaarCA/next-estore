import Image from "next/image";
import SectionTitle from "./SectionTitle";
import about from "../../public/assets/about.jpg";
import Link from "next/link";

export default function About() {
	return (
		<>
			<div className="bg-white dark:bg-base-200 container mx-auto px-8 md:px-0 my-8 py-8 rounded-lg">
				<div className="grid grid-cols-12 px-0 md:px-12 gap-8 items-center">
					<div className="grid_item col-span-12 md:col-span-5">
						<Image src={about} alt="About us image" className="rounded-lg" />
					</div>
          <div className="grid_item col-span-12 md:col-span-7">
            <h1 className="mb-4">About Decore</h1>
						<p className="tracking-wider leading-6 text-justify">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
							tempora, sapiente culpa modi consequatur recusandae, nemo eius
							odit est sint ratione dolor dolorem rem mollitia maiores magnam
							labore, ducimus deleniti aspernatur! Architecto, consectetur. Ex
							qui ab placeat officiis impedit doloremque, eum aut nulla
							blanditiis unde illum odit iusto praesentium!
							Iste.
						</p>
						<p className="tracking-wider leading-6 text-justify">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
							magnam quasi accusamus corrupti neque. Nam nobis nihil quae
							consequuntur facere dicta a voluptatibus dolor iure maxime.
							Adipisci sequi expedita quibusdam quos, provident obcaecati
							temporibus natus recusandae. Perferendis nulla doloribus ipsum
							mollitia officia hic culpa nostrum nesciunt cupiditate, tenetur
							quod dolore, asperiores perspiciatis, eveniet velit illum omnis
							debitis? Dolore expedita possimus molestias repellat dicta eaque
							autem facilis ullam dolores ad nesciunt, corrupti quibusdam
							doloribus praesentium illum neque cupiditate.
            </p>
            <Link href="/about" className="btn-theme mt-3">Read more</Link>
					</div>
				</div>
			</div>
		</>
	);
}
