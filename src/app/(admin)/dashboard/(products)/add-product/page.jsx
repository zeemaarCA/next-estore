"use client";

import Breadcrumbs from "@components/admin/Breadcrumbs";
import Button from "@components/admin/Button";
import Input from "@components/admin/Input";
import Title from "@components/admin/Title";
import SelectComponent from "@components/admin/Select";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "@utils/firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";
import Select from 'react-select';
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

export default function AddProduct() {
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(null);
	const [formData, setFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [categories, setCategories] = useState([]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/product/add", {
				method: "POST",
				body: JSON.stringify({
					name: formData.name,
					price: formData.price,
					category: formData.category,
					isAvailable: formData.isAvailable,
					productImage: formData.productImage,
					description: formData.description,
				}),
			});

			if (response.ok) {
				toast.success("Product created successfully");
				router.push("/dashboard/products-list");
				// redirect("/dashboard/products-list");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};


	const handleUploadImage = async () => {
		try {
			if (!file) {
				toast.error("Please select an image to upload");
				return;
			}
			const storage = getStorage(app);
			const fileName = new Date().getTime() + "-" + file.name;
			const storageRef = ref(storage, fileName);

			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setImageUploadProgress(progress.toFixed(0));
				},
				// eslint-disable-next-line no-unused-vars
				(error) => {
					toast.error("Error uploading image");
					setImageUploadProgress(null);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImageUploadProgress(null);
						setFormData({ ...formData, productImage: downloadURL });
					});
				}
			);
		} catch (error) {
			toast.error("Error uploading image");
			setImageUploadProgress(null);
			console.log(error);
		}
	};

	const isAvailableOptions = [
		{ label: "Yes", value: true },
		{ label: "No", value: false },
	];

	return (
		<>
			<section className="relative">
				<Breadcrumbs
					base="Dashboard"
					parent="Products"
					parentLink="/dashboard/products"
					child="Add Product"
				/>

				<div className="px-4 py-8 shadow-sm mt-4 rounded-md">
					<Title title="Add Product" />

					<div className="product-form px-4 py-8 bg-white dark:bg-slate-700 rounded-md">
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-4">
									<Input
										labelText="Product Name"
										type="text"
										placeholder="Enter product name"
										className="input input-bordered text-slate-700 dark:text-slate-300 w-full"
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
									/>
								</div>
								<div className="col-span-4">
									<Input
										labelText="Product Price"
										type="text"
										placeholder="Enter product price"
										className="input input-bordered text-slate-700 dark:text-slate-300 w-full"
										onChange={(e) =>
											setFormData({ ...formData, price: e.target.value })
										}
									/>
								</div>
								<div className="col-span-4 flex flex-col justify-between">
									<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
										Choose Category
									</label>
									<Select
										options={categories.map((cat) => ({
											label: cat,
											value: cat
										}))}
										onChange={(selectedOption) =>
											setFormData({ ...formData, category: selectedOption ? selectedOption.value : null })
										}
										value={formData.category ? { label: formData.category, value: formData.category } : null}
										placeholder="Select a category"
										isClearable
										isSearchable
										className="react-select-container"
										classNamePrefix="react-select"
										styles={{
											control: (baseStyles, state) => ({
												...baseStyles,
												borderColor: state.isFocused ? 'slate' : baseStyles.borderColor,
												boxShadow: state.isFocused ? '0 0 0 1px slate' : baseStyles.boxShadow,
												'&:hover': {
													borderColor: 'slate'
												},
											}),
										}}
									/>
								</div>
								<div className="col-span-4">
									<SelectComponent
										selectLabel="Choose an option"
										options={isAvailableOptions}
										onChange={(value) =>
											setFormData({ ...formData, isAvailable: value })
										}
										value={formData.isAvailable}
										placeholder="Select an option"
									/>
								</div>
								<div className="col-span-6 flex justify-start items-end gap-3">
									<Input
										labelText="Product Image"
										type="file"
										accept="image/*"
										className="file-input w-full"
										onChange={(e) => setFile(e.target.files[0])}
									/>
									<Button
										type="button"
										onClick={handleUploadImage}
										className="btn-theme"
										disabled={imageUploadProgress}
									>
										Upload Image
									</Button>
								</div>
								<div className="col-span-2 self-end">
									<div className="col-span-2 self-end">
										{imageUploadProgress ? (
											<div className="w-16 h-16">
												<CircularProgressbar
													value={imageUploadProgress}
													text={`${imageUploadProgress || 0}%`}
												/>
											</div>
										) : null}
									</div>
								</div>
								<div className="col-span-6">
									{formData.productImage && (
										<Image
											src={formData.productImage}
											alt="Uploaded image"
											className="w-full h-auto object-contain"
											width={300}
											height={200}
										/>
									)}
								</div>
								<div className="col-span-12">
									<ReactQuill
										theme="snow"
										placeholder="Write something..."
										className="h-72 mb-12 text-slate-700 dark:text-slate-300"
										value={formData.description || ""}
										required
										onChange={(value) =>
											setFormData({ ...formData, description: value })
										}
									/>
								</div>
							</div>
							<div className="form-btn mt-8">
								<Button
									type="sumbit"
									className="btn-theme"
									buttonText="Add Product"
								/>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
