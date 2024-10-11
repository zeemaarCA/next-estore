import Breadcrumbs from "@components/admin/Breadcrumbs";
import Pagination from "@components/admin/Pagination";
import Search from "@components/admin/Search";
import Title from "@components/admin/Title";
import { reviewsPage } from "@utils/actions/dashReviews";
import Image from "next/image";
import moment from "moment";
import { FaStar } from "react-icons/fa";

export default async function Reviews({ searchParams }) {
  const q = searchParams?.q || "";
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { count, reviewsData } = await reviewsPage(q, page);


  return (
    <div>
      <Breadcrumbs base="Dashboard" parent="Reviews" parentLink="" child="" />
      <div className="flex justify-between items-center">
        <Title title="Product Reviews" />
      </div>
      <Search placeholder="Search for a review..." count={count} />
      <div className="overflow-x-auto rounded-lg">
        <table className="table border border-slate-200 dark:border-slate-700">
          {/* head */}
          <thead className="bg-invert">
            <tr>
              <th>Product</th>
              <th>User name</th>
              <th>Review</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-700">
            {reviewsData.length > 0 ? (
              reviewsData.map((review) => (
                <tr key={review.id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            src={review.productImage}
                            alt="Avatar Tailwind CSS Component"
                            width={48}
                            height={48}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{review.productName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{review.userName}</td>
                  <td>{review.reviewText}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      ))}
                      <span>({review.rating})</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {moment(review.createdAt).format("ll")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {count > 12 && <Pagination count={count} />}
    </div>
  );
}
