"use client"

import Input from "@components/Input";
import Textarea from "@components/Textarea";
import { useState } from "react";


export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Validation function
  function validateForm(formData) {
    const errors = {};
    if (!formData.get("name")) {
      errors.name = "Name is required.";
    }
    const email = formData.get("email");
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address.";
    }
    if (!formData.get("message")) {
      errors.message = "Message is required.";
    }
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
    const formData = new FormData(event.target);

    // Validate form inputs
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form errors if validation passes
    setFormErrors({});
    setLoading(true);


    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(result.success);
        setError(null); // Clear any previous errors
        event.target.reset(); // Reset the form on success
      } else {
        setError(result.error);
        setSuccess(null); // Clear any previous success message
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className=" lg:mb-0 mb-10">
        <div className>
          <h4 className="invert-lslate-text text-base font-medium leading-6 mb-4 lg:text-left text-center">Contact Us</h4>
          <h2 className="text-priamry font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">Reach Out To Us</h2>
          {success && <p className="relative bg-green-50 text-green-600 text-center py-4 rounded-full mb-5">Thank you for your message. We will get back to you soon.</p>}
          {error && <p className="relative bg-red-50 text-red-600 text-center py-4 rounded-full mb-5">There was an error submitting your message. Please try again later.</p>}
          <form onSubmit={handleSubmit}>
            <div className="">
              {formErrors.name && (
                <p className="text-red-600 text-sm pl-5">{formErrors.name}</p>
              )}
              <input type="text" className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" placeholder="Name" name="name" />
            </div>
            <div className="">
              {formErrors.email && (
                <p className="text-red-600 text-sm pl-5">{formErrors.email}</p>
              )}
              <input type="email" className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" placeholder="Email" name="email" />
            </div>

            <div className="">
              {formErrors.message && (
                <p className="text-red-600 text-sm pl-5">{formErrors.message}</p>
              )}
              <textarea name="message" id="text" className="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4 mb-8" placeholder="Phone" defaultValue={""} />
            </div>
            <button type="submit" className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-primary relative shadow transition-all duration-700 hover:bg-indigo-800">{loading ? "Submitting..." : "Submit"}</button>
          </form>
        </div>
      </div>
    </>
  )
}
