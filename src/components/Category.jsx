"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

export default function Category() {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/category", {
        cache: "no-store",
      });
      const data = await response.json();
      setCategoryData(data); // Set the category data state
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when component mounts
  }, []);



  return (
    <>
      <SectionTitle title="Categories"/>
      {isLoading ? (
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
        </div>
      ) : (
        <div className="category-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryData.map((category) => (
            <div key={category._id} className="category-item bg-primary/10 px-4 py-3 rounded-lg border border-primary/20 hover:bg-primary/20 text-center">
              <Link href={`/shop?category=${category.category}`}>
                <h3 className="capitalize font-medium text-base md:text-xl">{category.category}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}

    </>
  )
}
