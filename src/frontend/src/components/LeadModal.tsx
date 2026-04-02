import { useState } from "react";
import { useLeads } from "../context/LeadsContext";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  vehicleName: string;
  formType: "Get Offers" | "Check On-Road Price" | "Book a Test Ride";
}

export function LeadModal({
  open,
  onClose,
  vehicleName,
  formType,
}: LeadModalProps) {
  const { addLead } = useLeads();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    city?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(phone))
      e.phone = "Enter a valid 10-digit phone number";
    if (!city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addLead({ name, phone, city, vehicleName, formType });
    setSubmitted(true);
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setCity("");
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      data-ocid="lead.modal"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
          data-ocid="lead.close_button"
        >
          ✕
        </button>
        {submitted ? (
          <div className="text-center py-6" data-ocid="lead.success_state">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-[#004085] dark:text-blue-400 mb-2">
              Request Sent!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Thank you, <strong>{name}</strong>! Our team will contact you
              shortly about the <strong>{vehicleName}</strong>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 btn-primary w-full py-3 rounded-xl"
              data-ocid="lead.confirm_button"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-[#004085] dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {formType}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {vehicleName}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="lead-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
                  data-ocid="lead.input"
                />
                {errors.name && (
                  <p
                    className="text-red-500 text-xs mt-1"
                    data-ocid="lead.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lead-phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
                  data-ocid="lead.input"
                />
                {errors.phone && (
                  <p
                    className="text-red-500 text-xs mt-1"
                    data-ocid="lead.error_state"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lead-city"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  City *
                </label>
                <input
                  id="lead-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
                  data-ocid="lead.input"
                />
                {errors.city && (
                  <p
                    className="text-red-500 text-xs mt-1"
                    data-ocid="lead.error_state"
                  >
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lead-vehicle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Vehicle
                </label>
                <input
                  id="lead-vehicle"
                  type="text"
                  value={vehicleName}
                  readOnly
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF8225] hover:bg-[#e06010] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                data-ocid="lead.submit_button"
              >
                {formType === "Get Offers"
                  ? "Get Best Offers"
                  : formType === "Check On-Road Price"
                    ? "Check Price"
                    : "Book Test Ride"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
