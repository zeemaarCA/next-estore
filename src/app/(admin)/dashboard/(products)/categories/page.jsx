"use client";
import Breadcrumbs from "@components/admin/Breadcrumbs";
import { deleteCategory } from "@utils/actions/product";
import Button from "@components/admin/Button";
import Modal from "@components/admin/Modal.jsx";
import Title from "@components/admin/Title";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Categories() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categories, setCategories] = useState([]);
	const [categoryData, setCategoryData] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		setIsEditing(false); // Default is not editing
		setCategories({ categoryName: "", isActive: "yes" });
	};

	// edit the category
	const handleEdit = (category) => {
		setSelectedCategory(category);
		setCategories({
			categoryName: category.category,
			isActive: category.isActive,
		});
		setIsEditing(true); // Set editing mode
		setIsModalOpen(true); // Open modal
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form behavior
		setIsSubmitting(true);
		setIsLoading(true);

		try {
			const url = isEditing
				? `/api/category/${selectedCategory._id}`
				: "/api/category/add";
			const method = isEditing ? "PATCH" : "POST";
			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					category: categories.categoryName,
					isActive: categories.isActive,
				}),
			});

			if (response.ok) {
				const updatedCategory = await response.json();
				setIsLoading(false);

				if (isEditing) {
					// Update the category data with the new edited data
					setCategoryData((prevData) =>
						prevData.map((cat) =>
							cat._id === selectedCategory._id
								? { ...cat, ...updatedCategory } // Merge the updated data with the old data
								: cat
						)
					);
					toast.success("Category updated successfully");
				} else {
					setCategoryData((prevData) => [...prevData, updatedCategory]);
					toast.success("Category created successfully");
					setIsLoading(false);
				}

				// Clear the form fields
				setCategories({ categoryName: "", isActive: "yes" });
				// Close the modal
				setIsModalOpen(false);
				// Reset selected category
				setSelectedCategory(null);
			} else {
				const errorData = await response.json();
				toast.error(errorData.message || "Error in category operation");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Error updating category");
		} finally {
			setIsSubmitting(false);
			setIsLoading(false);
		}
	};

	const fetchCategories = async () => {
		try {
			const response = await fetch("/api/category", {
				cache: "no-store",
			});
			const data = await response.json();
			setCategoryData(data); // Set the category data state
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	useEffect(() => {
		fetchCategories(); // Fetch categories when component mounts
	}, []);

	// Function to handle category deletion
	const handleDelete = async (id) => {
		try {
			// Use the deleteCategory server action
			const formData = new FormData();
			formData.append("id", id);

			const result = await deleteCategory(formData);

			if (result.success) {
				toast.success("Category deleted successfully");
				fetchCategories(); // Refetch categories after deletion
			} else {
				toast.error("Failed to delete category");
			}
		} catch (error) {
			console.error("Error deleting category:", error);
			toast.error("Error deleting category");
		}
	};

	return (
		<>
			<Breadcrumbs
				base="Dashboard"
				parent="Categories"
				parentLink="/dashboard/categories"
				child="Add or Edit Category"
			/>
			<div className="flex justify-between items-center">
				<Title title="Categories" />
				<Button
					onClick={openModal}
					type="button"
					className="btn-theme"
					data-pd-overlay="#modalBox-3"
					data-modal-target="modalBox-3"
					data-modal-toggle="modalBox-3"
				>
					Add Category
				</Button>
			</div>

			<div className="overflow-x-auto container mx-auto bg-white dark:bg-base-100 relative rounded-md">
				<table className="table">
					{/* head */}
					<thead className="bg-invert">
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" />
								</label>
							</th>
							<th>Category</th>
							<th>isAvailable</th>
							<th>Updated at</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-gray-700">
						{categoryData.map((category) => (
							<tr key={category._id} className="hover">
								<th>
									<label>
										<input type="checkbox" className="checkbox" />
									</label>
								</th>
								<td>{category.category}</td>
								<td>
									{category.isActive === "yes" ? (
										<span className="badge-theme">Yes</span>
									) : (
										<span className="badge-error">No</span>
									)}
								</td>
								<td className="whitespace-nowrap">
									{category.createdAt &&
										new Date(category.updatedAt).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
								</td>
								<td className="flex relative gap-1 flex-nowrap items-center">
									<Button
										className="btn btn-secondary btn-sm"
										onClick={() => handleEdit(category)}
									>
										Edit
									</Button>
									<Button
										className="btn btn-error btn-sm"
										onClick={() => handleDelete(category._id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<Modal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					categories={categories}
					setCategories={setCategories}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
}
