"use client";

import Breadcrumbs from "@components/admin/Breadcrumbs";
import Button from "@components/admin/Button";
import Input from "@components/admin/Input";
import SelectComponent from "@components/admin/Select";
import Title from "@components/admin/Title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "@utils/firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditProduct({ params }) {
	const [formData, setFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [file, setFile] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const router = useRouter();

	const { id } = params;

	const fetchedRef = useRef(false);

	useEffect(() => {
		const fetchProduct = async () => {
			// prevent fetching the product again if it has already been fetched
			if (fetchedRef.current) return;
			fetchedRef.current = true;
			try {
				setIsFetching(true);
				const response = await fetch(`/api/product/${id}`);
				if (response.ok) {
					const data = await response.json();
					setFormData(data);
					setIsFetching(false);
				} else {
					// Redirect to product list if the product is not found
					router.push("/dashboard/products-list");
					toast.error("Product not found, redirecting...");
				}
			} catch (error) {
				setIsFetching(false);
				console.log(error);
				router.push("/dashboard/products-list");
				toast.error("An unexpected error occurred, redirecting...");
			}
		};

		if (id) fetchProduct();
	}, [id, router]);

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Handle Select change
	const handleSelectChange = (value) => {
		setFormData((prevState) => ({
			...prevState,
			isAvailable: value === "true", // Convert to boolean if needed
		}));
	};

	// upload image to firebase storage
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

	const updateProduct = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!id) {
			return toast.error("Product ID not found");
		}

		try {
			setIsSubmitting(true);
			const response = await fetch(`/api/product/${id}`, {
				method: "PATCH",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (response.ok) {
				toast.success("Product updated successfully");
				router.push("/dashboard/products-list");
				setIsSubmitting(false);
			} else {
				if (response.status === 404) {
					// Redirect if product not found
					router.push("/dashboard/products-list");
					toast.error("Product not found, redirecting...");
				} else {
					toast.error(data.error || "Error updating product");
					setIsSubmitting(false);
				}
			}
		} catch (error) {
			console.log(error);
			setIsSubmitting(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isAvailableOptions = [
		{ label: "Yes", value: true },
		{ label: "No", value: false },
	];

	return (
		<section className="relative">
			<Breadcrumbs
				base="Dashboard"
				parent="Products"
				parentLink="/dashboard/products/"
				child="Update Product"
			/>

			<div className="bg-invert px-4 py-8 shadow-sm mt-4 rounded-md">
				<Title title="Update Product" />

				<div className="product-form">
					{isFetching ? (
						<div className="flex flex-col justify-center items-center">
							Fetching Product...
							<span className="loading loading-infinity loading-lg"></span>
						</div>
					) : (
						<form onSubmit={updateProduct}>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-4">
									<Input
										labelText="Product Name"
										type="text"
										name="name"
										placeholder="Enter product name"
										className="input input-bordered text-gray-700 dark:text-gray-300 w-full"
										value={formData.name || ""}
										onChange={handleInputChange}
									/>
								</div>
								<div className="col-span-4">
									<Input
										labelText="Product Price"
										type="number"
										name="price"
										placeholder="Enter product price"
										className="input input-bordered text-gray-700 dark:text-gray-300 w-full"
										value={formData.price || ""}
										onChange={handleInputChange}
									/>
								</div>
								<div className="col-span-4">
									<Input
										labelText="Product Category"
										type="text"
										name="category"
										placeholder="Enter product category"
										className="input input-bordered text-gray-700 dark:text-gray-300 w-full"
										value={formData.category || ""}
										onChange={handleInputChange}
									/>
								</div>
								<div className="col-span-4">
									<SelectComponent
										selectLabel="Availability"
										options={isAvailableOptions}
										name="isAvailable"
										value={formData.isAvailable}
										onChange={handleSelectChange}
										placeholder="Select availability"
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
									{imageUploadProgress ? (
										<div className="w-16 h-16">
											<CircularProgressbar
												value={imageUploadProgress}
												text={`${imageUploadProgress || 0}%`}
											/>
										</div>
									) : null}
								</div>
								<div className="col-span-6">
									{formData.productImage && (
										<Image
											src={formData.productImage}
											alt="Uploaded image"
											className="w-full h-atuo object-contain"
											width={300}
											height={200}
										/>
									)}
								</div>
								<div className="col-span-12">
									<ReactQuill
										theme="snow"
										placeholder="Enter product description"
										className="h-72 mb-12 text-gray-700 dark:text-gray-300"
										value={formData.description || ""}
										onChange={(value) =>
											setFormData({ ...formData, description: value })
										}
									/>
								</div>
							</div>
							<div className="form-btn mt-8">
							<Button
                  type="submit"
                  className="btn-theme"
                  buttonText={isSubmitting ?
                    <span className="loading loading-spinner loading-md"></span>
                    : "Save Changes"
                  }
                  disabled={isSubmitting}
                />
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
