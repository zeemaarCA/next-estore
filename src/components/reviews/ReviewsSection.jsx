import React from 'react'
import SingleReview from './SingleReview'

export default function ReviewsSection({ reviews }) {
  return (
    <>
      <section className="py-24 relative bg-invert">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-bold text-4xl text-center mb-11">Rating & Reviews</h2>
          {reviews.length > 0 ? (
            <>
              <div className="grid grid-cols-12 py-6 border-y border-theme-slate mb-6">
                <div className="col-span-12 lg:col-span-10 ">
                  <h5 className="font-semibold text-2xl leading-9 invert-slate-text">Reviews
                    <span className="lg:hidden font-semibold text-2xl leading-9 invert-slate-text text-center"> &amp;
                      Rating</span>
                  </h5>
                </div>
                <div className="col-span-12 lg:col-span-2 max-lg:hidden">
                  <h5 className="font-semibold text-2xl leading-9 invert-slate-text">Rating</h5>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <SingleReview reviews={reviews} />
              </div>
            </>
          ) : (
            <div className="flex justify-center py-6 border-y border-theme-slate mb-6">
              No reviews yet
            </div>
          )}
        </div>
      </section>


    </>
  )
}
