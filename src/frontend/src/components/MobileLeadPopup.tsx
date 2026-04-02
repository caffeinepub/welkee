import { useState } from "react";
import { addPhoneLead } from "../utils/clickStats";

interface MobileLeadPopupProps {
  vehicleName: string;
  vehicleId: string;
  brandUrl: string;
  onClose: () => void;
}

export function MobileLeadPopup({
  vehicleName,
  vehicleId,
  brandUrl,
  onClose,
}: MobileLeadPopupProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    addPhoneLead(digits, vehicleName, vehicleId);
    window.open(brandUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleCancel = () => {
    window.open(brandUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (error) setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      data-ocid="lead.modal"
    >
      {/* Backdrop click — cancel without saving */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        aria-label="Close popup"
        onClick={handleCancel}
        tabIndex={-1}
      />

      <dialog
        open
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 m-0"
        aria-labelledby="lead-popup-title"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1"
          aria-label="Close"
          data-ocid="lead.close_button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 mx-auto">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF8225"
            strokeWidth="2"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2
          id="lead-popup-title"
          className="text-xl font-extrabold text-gray-900 text-center mb-1"
        >
          Get Exclusive Access
        </h2>
        <p className="text-sm text-gray-500 text-center mb-1">
          <span className="font-semibold text-[#004085]">{vehicleName}</span>
        </p>
        <p className="text-sm text-gray-500 text-center mb-5">
          Enter your mobile number to visit the Official Brand Site &amp; access
          Special Offers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium select-none">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="10-digit mobile number"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8225] focus:border-transparent transition-all"
              data-ocid="lead.input"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs" data-ocid="lead.error_state">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF8225] hover:bg-[#e06010] text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            data-ocid="lead.submit_button"
          >
            Continue to Brand Site
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full text-gray-400 hover:text-gray-600 text-xs py-1 transition-colors"
            data-ocid="lead.cancel_button"
          >
            Skip &amp; Continue without saving
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          🔒 Your number is private and used only to send you offers.
        </p>
      </dialog>
    </div>
  );
}
