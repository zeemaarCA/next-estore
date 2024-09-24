"use client"
import { BsGift } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { RiDiscountPercentLine, RiSecurePaymentLine } from "react-icons/ri";
export default function Highlights() {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-start md:items-center mt-10 bg-primary/10 py-8 px-4 rounded-lg border border-primary/20 divide-x-2 divide-primary">
      <div className="highlight-item w-full flex justify-center items-start gap-2">
        <BsGift className="w-8 h-8 text-primary relative bottom-[4px]" />
        <h3 className="text-lg">FREE GIFT WRAPPING</h3>
      </div>
      <div className="highlight-item w-full flex justify-center items-start gap-2">
        <TbTruckReturn className="w-8 h-8 text-primary relative bottom-[4px]" />
        <h3 className="text-lg">EASY & FREE RETURNS</h3>
      </div>
      <div className="highlight-item w-full flex justify-center items-start gap-2">
        <RiDiscountPercentLine className="w-8 h-8 text-primary relative bottom-[4px]" />
        <h3 className="text-lg">STUDENT DISCOUNT</h3>
      </div>
      <div className="highlight-item w-full flex justify-center items-start gap-2">
        <RiSecurePaymentLine className="w-8 h-8 text-primary relative bottom-[4px]" />
        <h3 className="text-lg">100% SECURE SHOPPING</h3>
      </div>
    </div>
  )
}
