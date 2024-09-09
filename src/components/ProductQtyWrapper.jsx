"use client";

import { useState } from 'react';
import ProductQty from "./ProductQty";
import AddToCartButton from "@components/cart/AddToCartBtn";

export default function ProductQtyWrapper({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <>
      <div className="flex">
        <ProductQty onQuantityChange={handleQuantityChange} />
      </div>
      <div className="mt-7 flex flex-row items-center gap-6">
        <AddToCartButton className="btn-theme" product={product} quantity={quantity} />
        <button className="btn-theme-outline">Add to wishlist</button>
      </div>
    </>
  );
}