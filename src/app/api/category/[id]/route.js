// pages/api/category/update/[id].js

import { connect } from "@utils/mongodb/mongoose";
import Category from "@utils/models/category.model"; // Your Category model


export const PATCH = async (request, { params }) => {
  const { category, isActive } = await request.json();

  try {
    await connect();

    if (!params.id) {
      // return new Response("Product ID not provided", { status: 400 });
      return new Response(
        JSON.stringify({ error: "category ID not provided" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Find the existing product by ID
    const existingCategory = await Category.findById(params.id);

    if (!existingCategory) {
      // return new Response("Category not found", { status: 404 });
      return new Response(
        JSON.stringify({ error: "Category not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }


    // Update the category with new data
    existingCategory.category = category;
    existingCategory.isActive = isActive;

    const updatedCategory = await existingCategory.save();

    return new Response(
      JSON.stringify(updatedCategory),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(
      JSON.stringify({ error: "Error updating category" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
