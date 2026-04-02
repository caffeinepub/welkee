import { EMIWidget } from "../components/EMIWidget";

export function EMIPage() {
  return (
    <main
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      data-ocid="emi.page"
    >
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <span className="text-5xl">🧮</span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-3">
            EMI Calculator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Calculate your monthly EMI for any bike or scooter loan.
          </p>
        </div>
        <EMIWidget />
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 text-sm text-blue-700 dark:text-blue-300">
          <p className="font-semibold mb-1">ℹ️ Note</p>
          <p>
            EMI figures are indicative. Actual EMI may vary based on lender
            terms, processing fees, and your credit profile. Always confirm with
            the dealership or bank.
          </p>
        </div>
      </div>
    </main>
  );
}
