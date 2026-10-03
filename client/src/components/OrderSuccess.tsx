import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";

interface OrderSuccessProps {
  redirectDelay?: number; // Time in milliseconds (Default: 4000ms / 4s)
  onComplete?: () => void;
}

export default function OrderSuccess({
  redirectDelay = 4000,
  onComplete,
}: OrderSuccessProps) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(Math.ceil(redirectDelay / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      if (onComplete) onComplete();
      navigate("/products"); // Redirect to products page
    }, redirectDelay);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate, redirectDelay, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
          <CheckCircle2 className="h-10 w-10 animate-bounce" />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Order Placed Successfully! 🎉
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Thank you for your purchase. We have received your order and are processing it right away.
        </p>

        {/* Countdown Progress Card */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 mb-6">
          <p className="text-xs text-slate-400 mb-2 flex items-center justify-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-teal-400" />
            Redirecting to shop in{" "}
            <span className="font-bold text-teal-400">{timeLeft}s</span>...
          </p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full transition-all ease-linear duration-1000"
              style={{
                width: `${(timeLeft / Math.ceil(redirectDelay / 1000)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Manual Redirect Button */}
        <button
          onClick={() => {
            if (onComplete) onComplete();
            navigate("/products");
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition-all shadow-lg shadow-teal-900/20 active:scale-[0.98]"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}