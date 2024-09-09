import Product from "@utils/models/category.model";
import { connect } from "@utils/mongodb/mongoose";
import { revalidatePath } from "next/cache";

export const POST = async (request) => {
  const { category, isActive } = await request.json();

  try {
    await connect();
    const newCategory = new Product({
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
