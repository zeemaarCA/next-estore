import { fetchBlog } from "@utils/actions/blogs";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsTwitterX, BsFacebook, BsLinkedin } from "react-icons/bs";


const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

// Function to generate metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetch user data to set metadata
  const blogs = await fetchBlog(slug);
  const blogTitle = blogs?.title || "Blog title";
  const content = stripHtmlTags((blogs?.content || "Blog description").substring(0, 250)) + "...";

  return {
    title: blogTitle,
    description: content,
  };
}



export default async function Blog({ params }) {

  const { slug } = params;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const blog = await fetchBlog(slug);

    if (!blog) {
      notFound();
    }


    return (
      <>
        <section className="relative pt-20 pb-24 bg-cgreen-500 dark:bg-supernova-400/20">
          <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl px-5 lg:px-11 mx-auto max-md:px-4">
            <h1 className="text-white font-manrope font-semibold text-4xl min-[500px]:text-5xl leading-tight mb-8">{blog.title}</h1>
            <div className="flex items-center justify-between">
              <div className="data">
                <p className="font-normal text-lg leading-7 text-white">Admin, Chief Legal Officer</p>
              </div>
              <div className="flex items-center gap-5">
                <Link href=""><BsTwitterX className="w-6 h-6 cursor-pointer text-gray-100 dark:text-gray-200"/></Link>
                <Link href=""><BsFacebook className="w-6 h-6 cursor-pointer text-gray-100 dark:text-gray-200"/></Link>
                <Link href=""><BsLinkedin className="w-6 h-6 cursor-pointer text-gray-100 dark:text-gray-200"/></Link>
              </div>
            </div>
            <div className="mt-4">
          <div className="flex justify-between items-center">
            <div><span className="text-white">Category: {blog.category}</span></div>
            <div><span className="text-white">{moment(blog.createdAt).format('ll')}</span></div>
          </div>
        </div>
          </div>
        </section>

        <div className="blog-data my-12 flex justify-center items-center">
          <div className="blog-image px-4 ">
            <Image
              src={blog.blogImage}
              alt={blog.title}
              width={1000}
              height={500}
              className="w-full md:max-w-md lg:max-w-2xl relative z-10 shadow rounded-lg"
            />
          </div>
        </div>
          <div className="blog-content px-4 mb-12">
            <div className="prose mx-auto prose-headings:text-primary">
            <div dangerouslySetInnerHTML={{
              __html: blog.content || 'No content available'
            }} />
            </div>
        </div>




      </>
    )
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
