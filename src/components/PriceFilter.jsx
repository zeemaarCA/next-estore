'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LuFilterX } from "react-icons/lu";
import { useEffect, useState } from 'react';

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);

  const category = searchParams.get('category') || '';
  const price = searchParams.get('price') || '';
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        // Extract category names from the data
        const categoryNames = data.map(item => item.category);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`/shop?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push('/shop'); // Navigate to the base URL without filters
  };

  const isFilterApplied = !!category || !!price || sort !== 'newest';

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <div className="flex items-center w-full md:w-auto">
          <label htmlFor="category" className="mr-2 text-sm font-medium w-32 md:w-auto">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleFilterChange}
            className="w-full md:w-auto px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-r-8 border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option className='capitalize' key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <label htmlFor="price" className="mr-2 text-sm font-medium w-32 md:w-auto">Price:</label>
          <select
            id="price"
            name="price"
            value={price}
            onChange={handleFilterChange}
            className="w-full md:w-auto px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-r-8 border-transparent"
          >
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <label htmlFor="sort" className="mr-2 text-sm font-medium w-32 md:w-auto">Sort by:</label>
          <select
            id="sort"
            name="sort"
            value={sort}
            onChange={handleFilterChange}
            className="w-full md:w-auto px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-r-8 border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Show the Reset Filters button only if a filter is applied */}
      {isFilterApplied && (
        <button
          onClick={resetFilters}
          className="flex gap-1 items-center btn-theme-outline transition"
        >
          <LuFilterX /> Reset Filters
        </button>
      )}
    </div>
  );
}
