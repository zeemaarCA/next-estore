import Post from "@utils/models/post.model";
import { connect } from "@utils/mongodb/mongoose";
import { bucket } from "@utils/firebaseAdmin";

export const GET = async (request, { params }) => {
    try {
        await connect()

        const blog = await Post.findById(params.id);
        if (!blog) return new Response("Blog Not Found", { status: 404 });

        return new Response(JSON.stringify(blog), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
  const { title, category, isActive, blogImage, content } = await request.json();

  try {
    await connect();

    if (!params.id) {
        // return new Response("Blog ID not provided", { status: 400 });
        return new Response(
            JSON.stringify({ error: "Blog ID not provided" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Find the existing blog by ID
    const existingBlog = await Post.findById(params.id);

    if (!existingBlog) {
        // return new Response("Blog not found", { status: 404 });
        return new Response(
            JSON.stringify({ error: "Blog not found" }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Update the blog with new data
    const updatedFields = { title, category, isActive, content };

    // Only update blogImage if a new one is provided
    if (blogImage && blogImage !== existingBlog.blogImage) {
      updatedFields.blogImage = blogImage;

      // Handle the old image deletion
      if (existingBlog.blogImage) {
        const oldFileName = existingBlog.blogImage.split('/').pop().split('?')[0];
        try {
          await bucket.file(oldFileName).delete();
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }
    }

    // Update the blog post
    await Post.findByIdAndUpdate(params.id, updatedFields, { new: true });

    return new Response(
        JSON.stringify({ message: "Successfully updated the blog" }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return new Response(
        JSON.stringify({ error: "Error updating blog" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};