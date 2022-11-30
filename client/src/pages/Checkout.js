import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/form/CheckoutForm";
import "../common.css";

const stripePromise = loadStripe(process.env.REACT_APP_PAY_PUBLIC_KEY);

const Checkout = () => {
  const { product } = useLoaderData();
  return (
    <div className="mt-8">
      <div className="max-w-[600px] mx-auto ">
        <h1 className="text-2xl font-bold mb-8">Payment Details</h1>
        <h1 className="text-lg ">
          Payment For {product.brand} {product.model} {product.editions}
        </h1>
        <p className="font-bold">Pay Cost : {product.price} Taka </p>
        <div>
          {product && (
            <Elements stripe={stripePromise}>
              <CheckoutForm product={product} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
