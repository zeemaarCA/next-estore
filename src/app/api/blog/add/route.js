import Post from "@utils/models/post.model";
import { connect } from "@utils/mongodb/mongoose";
export const POST = async (request) => {


  // Get the Backend API User object when you need access to the user's information

  const { userId, title, content, isActive, blogImage, category } = await request.json();

    const slug = title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-]/g, '');

    console.log(slug);


    try {
        await connect();
      const newPost = new Post({
          userId,
          title,
          content,
          blogImage,
          category,
          slug,
          isActive,
        });

        await newPost.save();

        return new Response(JSON.stringify(newPost), { status: 201, })
    } catch (error) {
        return new Response("Failed to create a new post", { status: 500 });
    }
}
