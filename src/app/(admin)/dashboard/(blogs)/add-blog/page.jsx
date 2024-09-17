"use client";

import Breadcrumbs from "@components/admin/Breadcrumbs";
import Button from "@components/admin/Button";
import Input from "@components/admin/Input";
import Title from "@components/admin/Title";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
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
import Image from "next/image";
import SelectComponent from "@components/admin/Select";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";


export default function AddBlog() {
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [imageUploadProgress, setImageUploadProgress] = useState(null);
	const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);

  const userId = currentUser?.id;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/blog/add", {
				method: "POST",
        body: JSON.stringify({
          userId,
          title: formData.title,
          content: formData.content,
          blogImage: formData.blogImage,
          category: formData.category,
          slug: formData.slug,
          isActive: formData.isActive,
        }),
			});

			if (response.ok) {
				toast.success("Post created successfully");
				router.push("/dashboard/blogs-list");
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
						setFormData({ ...formData, blogImage: downloadURL });
					});
				}
			);
		} catch (error) {
			toast.error("Error uploading image");
			setImageUploadProgress(null);
			console.log(error);
		}
	};

	const isActiveOptions = [
		{ label: "Active", value: "true" },
		{ label: "Inactive", value: "false" },
	];

	return (
		<>
			<section className="relative">
				<Breadcrumbs
					base="Dashboard"
					parent="Blogs"
					parentLink="/dashboard/blogs-list"
					child="Add Blog"
				/>

				<div className="px-4 py-8 shadow-sm mt-4 rounded-md">
					<Title title="Add Blog" />

					<div className="product-form bg-white dark:bg-gray-700 px-4 py-8 rounded-md">
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <Input
                    labelText="Blog Title"
                    type="text"
                    placeholder="Enter blog title"
                    className="input input-bordered text-gray-700 dark:text-gray-300 w-full"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    labelText="Blog Category"
                    type="text"
                    placeholder="Enter blog category"
                    className="input input-bordered text-gray-700 dark:text-gray-300 w-full"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
								<div className="col-span-4">
									<SelectComponent
										selectLabel="Status"
										options={isActiveOptions}
										onChange={(value) =>
											setFormData({ ...formData, isActive: value })
										}
										value={formData.isActive}
										placeholder="Select an option"
									/>
								</div>
								<div className="col-span-6 flex justify-start items-end gap-3">
									<Input
										labelText="Blog Image"
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
									{formData.blogImage && (
										<Image
											src={formData.blogImage}
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
										className="h-72 mb-12 text-gray-700 dark:text-gray-300"
										value={formData.content || ""}
										required
										onChange={(value) =>
											setFormData({ ...formData, content: value })
										}
									/>
								</div>
							</div>
							<div className="form-btn mt-8">
								<Button
									type="sumbit"
									className="btn-theme"
									buttonText="Add Blog"
								/>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
