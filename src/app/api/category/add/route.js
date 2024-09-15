import Category from "@utils/models/category.model";
import { connect } from "@utils/mongodb/mongoose";
import { revalidatePath } from "next/cache";

export const POST = async (request) => {
  const { category, isActive } = await request.json();

  try {
    await connect();

    // Check if the category already exists
    const existingCategory = await Category.findOne({ category: category });
    if (existingCategory) {
      return new Response(JSON.stringify({ message: "Category already exists" }), { status: 400 });
    }

    const newCategory = new Category({
      category,
      isActive,
    });

    await newCategory.save();

    revalidatePath('/dashboard/categories');
    return new Response(JSON.stringify(newCategory), { status: 201 })
  } catch (error) {
    return new Response("Failed to create a new category", { status: 500 });
  }
}
