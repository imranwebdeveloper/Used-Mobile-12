import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import Spinner from "../common/Spinner";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [tranId, setTranId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://server-imranwebdeveloper.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: product.price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [product]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    setLoading(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        transactionId: paymentIntent.id,
        productId: product._id,
        userId: user._id,
      };

      fetch("https://server-imranwebdeveloper.vercel.app/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((result) => {
          setSuccess("Congress! Your Payment was successfully");
          setTranId(paymentIntent.id);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-4 mt-4 shadow-md ">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading}
          className="bg-blue-600 text-white px-8 py-1 rounded font-bold"
        >
          Conform Pay
        </button>
        {error && <p className="text-red-700">{error}</p>}
      </form>
      <div className="mt-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {success && (
              <div className="text-center">
                <h1 className="text-center text-2xl  text-green-600">
                  {success}
                </h1>
                <p>
                  Transaction ID : <span className="font-bold">{tranId}</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutForm;
