// src/pages/PaymentCallback.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function PaymentCallback() {
  const [params] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const ref = params.get("reference");
      if (!ref) {
        alert("No reference found.");
        nav("/");
        return;
      }

      try {
        // ✅ Verify with your backend
        await API.get(`/payments/paystack/verify?reference=${ref}`);
        alert("Payment verified successfully!");
        nav("/student");
      } catch (err) {
        console.error("Verification error:", err);
        alert("Payment verification failed.");
        nav("/");
      }
    };

    verifyPayment();
  }, [params, nav]);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-medium">
      Verifying payment, please wait...
    </div>
  );
}
