"use client"
import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { getSingleOrder, getSingleProduct } from "@utils/actions/reviews";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import StarRating from "@components/StarRating";
import Textarea from "@components/Textarea";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'

export default function OrderReview() {

  const router = useRouter();
  const { userId } = useAuth()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [order, setOrder] = useState({});
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null)

  const orderId = searchParams.get('orderId')
  const productId = searchParams.get('productId')
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      const getorder = await getSingleOrder(orderId);
      const getproduct = await getSingleProduct(productId);

      // If order or product is invalid, set an error message
      if (!getorder || !getproduct) {
        setError("Invalid order or product. Please check the URL or contact support.");
        setLoading(false);
        return;
      }

      setProduct(getproduct);
      setOrder(getorder);
      setLoading(false);
    };
    fetchOrders();
  }, [orderId, productId]);


  // post review

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    const data = new FormData(e.target);
    const res = await fetch(`/api/review/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        orderId: orderId,
        review: data.get("review"),
        rating: rating,
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message);
      setIsSubmitting(false);
      return;
    }
    toast.success("Review posted successfully");
    router.push("/orders")
    setIsSubmitting(false);
  };



  return (
    <>
      {loading ? (
        <div className="container flex justify-center min-h-40 mt-10 mb-10">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (error ? (
        <>
          <div className="container flex flex-col justify-center min-h-40 text-center mt-10 mb-10">
            <h3>No Product found for review</h3>
              <p>The product you are looking for may have been removed from our catalog.</p>
              <Link href="/orders" className='btn-theme !max-w-max !mx-auto !mt-4'>Back to orders page</Link>
          </div>
        </>
      ) : (
        <section className="py-24 relative">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 bg-invert py-8 rounded-lg shadow-md">
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-8 md:pr-8 md:border-r border-gray-200">
                <div className="flex max-sm:flex-col items-center justify-start mb-3">
                  <p className="font-medium text-lg leading-8 invert-lslate-text">Order: {order.orderId}</p>
                </div>
                <div className="flex max-sm:flex-col items-center justify-between mb-6">
                  <h3 className="font-bold text-2xl leading-9 line-clamp-1">{product.name}</h3>
                  <h2 className="font-bold text-2xl leading-10 invert-slate-text">${product.price}</h2>
                </div>
                <div className="flex max-sm:flex-col items-center justify-between mb-6">
                  <span className="invert-slate-text">Quantity: {order?.products?.find(singlep => singlep.productId === productId)?.quantity || 'Loading...'}</span>
                  <span className="invert-slate-text">Purchased On: {moment(order?.createdAt).format('LLL')}</span>
                </div>
                <div className="img-box w-full max-sm:mx-auto mb-12">
                  <Image src={product.productImage} alt={product.name} className="rounded-xl object-cover" width={350} height={350} />
                </div>
                <div className="flex items-center max-sm:flex-col md:justify-end gap-4">
                  <Link href={`/product/${product.slug}`} className="btn-theme">Buy
                    Again</Link>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 md:pl-8 max-md:mt-7 flex flex-col items-center">
                <form className='w-full' onSubmit={handleSubmit}>
                  <input type="hidden" name="productId" value={productId} />
                  <input type="hidden" name="orderId" value={orderId} />
                  <input type="hidden" name="userId" value={userId} />

                  <div className="w-full">
                    <div className="flex items-center justify-between mb-5 max-md:max-w-sm max-sm:mx-auto">
                      <h3 className="font-bold text-2xl leading-9 invert-slate-text">Write a review</h3>
                      <svg className="cursor-pointer" width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0261 14.2259L25.5755 25.7753M14.0261 25.7753L25.5755 14.2259" stroke="#bbb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center w-full max-w-sm max-sm:mx-auto gap-4">
                      <Textarea name="review" id="review" cols={30} rows={10} className="border border-slate-400 bg-invert invert-slate-text" placeholder="Enter a description..." defaultValue={""} />
                      <div className='w-full flex justify-between items-center'>
                        <span className='invert-slate-text'>Rating</span>
                        <StarRating rating={rating} setRating={setRating} />
                      </div>
                      <button className="btn-theme w-full" type='submit'>
                        {isSubmitting ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <span>Post review</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ))}


    </>
  )
}
