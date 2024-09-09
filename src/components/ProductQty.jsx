"use client";

import { useState } from 'react';

export default function ProductQty({ onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <>
      <button className={`${plusMinuceButton}`} onClick={handleDecrement}>−</button>
      <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
        {quantity}
      </div>
      <button className={`${plusMinuceButton}`} onClick={handleIncrement}>+</button>
    </>
  );
}