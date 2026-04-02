import { useState } from "react";

function calcEMI(principal: number, rate: number, months: number): number {
  if (rate === 0) return principal / months;
  const r = rate / 12 / 100;
  return (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
}

interface EMIWidgetProps {
  defaultPrice?: number;
  compact?: boolean;
}

export function EMIWidget({
  defaultPrice = 1.5,
  compact = false,
}: EMIWidgetProps) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(0.2);
  const [tenure, setTenure] = useState(36);
  const [rate, setRate] = useState(9.5);

  const principal = Math.max(0, price - downPayment) * 100000;
  const emi = calcEMI(principal, rate, tenure);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 ${
        compact ? "p-4" : "p-6"
      }`}
    >
      {!compact && (
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🧮</span> EMI Calculator
        </h3>
      )}
      <div
        className={`grid gap-4 ${
          compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        <div>
          <label
            htmlFor="emi-price"
            className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block"
          >
            Vehicle Price (₹ Lakhs)
          </label>
          <input
            id="emi-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            step={0.01}
            min={0.1}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
            data-ocid="emi.input"
          />
        </div>
        <div>
          <label
            htmlFor="emi-down"
            className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block"
          >
            Down Payment (₹ Lakhs)
          </label>
          <input
            id="emi-down"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            step={0.01}
            min={0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
            data-ocid="emi.input"
          />
        </div>
        <div>
          <label
            htmlFor="emi-tenure"
            className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block"
          >
            Loan Tenure
          </label>
          <select
            id="emi-tenure"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
            data-ocid="emi.select"
          >
            <option value={12}>12 months</option>
            <option value={24}>24 months</option>
            <option value={36}>36 months</option>
            <option value={48}>48 months</option>
            <option value={60}>60 months</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="emi-rate"
            className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block"
          >
            Interest Rate (% p.a.)
          </label>
          <input
            id="emi-rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            step={0.1}
            min={1}
            max={30}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
            data-ocid="emi.input"
          />
        </div>
      </div>

      {/* Result */}
      <div className="mt-4 bg-gradient-to-r from-[#004085] to-blue-600 rounded-xl p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-80">Monthly EMI</span>
          <span className="text-2xl font-extrabold">
            ₹
            {Number.isNaN(emi) ? "--" : Math.round(emi).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="border-t border-blue-400 pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="opacity-70">Total Interest</span>
            <p className="font-bold">
              ₹
              {Number.isNaN(totalInterest)
                ? "--"
                : Math.round(totalInterest).toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <span className="opacity-70">Total Amount</span>
            <p className="font-bold">
              ₹
              {Number.isNaN(totalAmount)
                ? "--"
                : Math.round(totalAmount).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
