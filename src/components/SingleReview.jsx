import moment from "moment";
import Image from "next/image";

export default function SingleReview({ reviews }) {
  return (
    <>
      {reviews.map((review) => {
        const stars = Array.from({ length: 5 }, (_, index) => index < review.rating);
        return (
          <div className="grid grid-cols-12 max-w-sm sm:max-w-full mx-auto w-full px-8 border-b border-b-slate-100 dark:border-b-slate-700 last:border-b-0 pb-4" key={review._id}>
            <div className="col-span-12 lg:col-span-10">
              <div className="sm:flex gap-6">
                <Image
                  src={review.userImage}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div className="text">
                  <p className="font-medium text-lg leading-8 invert-slate-text mb-2">{review.userFirstName}</p>
                  <div className="flex lg:hidden items-center gap-2 lg:justify-between w-full mb-5">
                    {/* Star SVGs for mobile view */}
                    {stars.map((isFilled, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill={isFilled ? "#FBBF24" : "#E5E7EB"}
                      >
                        <g clipPath="url(#clip0_13624_2090)">
                          <path
                            d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                            fill={isFilled ? "#FBBF24" : "#E5E7EB"}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_13624_2090">
                            <rect width={30} height={30} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    ))}
                  </div>
                  <p className="font-normal text-base leading-7 text-gray-400 mb-4 lg:pr-8">
                    {review.review}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="lg:hidden font-medium text-sm leading-7 text-gray-400 lg:text-center whitespace-nowrap">
                      {moment(review.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-2 max-lg:hidden flex lg:items-center flex-row lg:flex-col justify-center max-lg:pt-6">
              <div className="flex items-center gap-2 lg:justify-between w-full mb-5">
                {/* Star SVGs for desktop view */}
                {stars.map((isFilled, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill={isFilled ? "#FBBF24" : "#E5E7EB"}
                  >
                    <g clipPath="url(#clip0_13624_2090)">
                      <path
                        d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                        fill={isFilled ? "#FBBF24" : "#E5E7EB"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13624_2090">
                        <rect width={30} height={30} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ))}
              </div>
              <p className="font-medium text-lg leading-8 text-gray-400 lg:text-center whitespace-nowrap">
                {moment(review.createdAt).fromNow()}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
