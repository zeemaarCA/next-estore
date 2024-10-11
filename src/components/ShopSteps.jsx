export default function ShopSteps({ currentStep }) {
  return (
    <>
      <div className="justify-center pt-10 pb-5 hidden md:flex">
        <ul className="steps steps-horizontal">
          <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Add Items</li>
          <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Checkout</li>
          <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Purchase</li>
          <li className={`step ${currentStep >= 4 ? 'step-primary' : ''}`}>Payment Completed</li>
        </ul>
      </div>
    </>
  );
}

