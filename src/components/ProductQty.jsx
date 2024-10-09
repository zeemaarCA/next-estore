"use client";

import { useState } from 'react';

export default function ProductQty({ onQuantityChange }) {
  const [quantity, setQuantity] = useState(1);

  const plusMinuceButton =
    "flex h-8 w-8 bg-[#e3e3e3] dark:bg-slate-900 cursor-pointer items-center justify-center border  border-slate-300 dark:border-slate-700 duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-slate-500 active:ring-2 active:ring-slate-500";

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
      <button className={`${plusMinuceButton} rounded-tl-md rounded-bl-md`} onClick={handleDecrement}>−</button>
      <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b border-slate-300 dark:border-slate-700 active:ring-slate-500">
        {quantity}
      </div>
      <button className={`${plusMinuceButton} rounded-tr-md rounded-br-md`} onClick={handleIncrement}>+</button>
    </>
  );
}