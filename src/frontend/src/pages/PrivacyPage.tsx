export function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you voluntarily provide when filling out lead forms (name, phone number, city), browsing data, and device/browser information for analytics purposes. We do not collect sensitive personal data.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Information collected is used to: connect you with dealerships for offers and test rides, improve our platform and user experience, send promotional communications (with your consent), and analyze usage patterns.",
    },
    {
      title: "3. Data Sharing",
      content:
        "We share your contact information only with verified dealerships you have expressed interest in. We do not sell your personal data to third parties. We may share aggregated, anonymized data for market research.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement industry-standard security measures to protect your data. Lead data is stored securely and accessible only to authorized personnel. We regularly review and update our security practices.",
    },
    {
      title: "5. Cookies",
      content:
        "We use cookies to remember your preferences (such as dark/light mode and city selection), analyze traffic, and provide a personalized experience. You can disable cookies in your browser settings.",
    },
    {
      title: "6. Your Rights",
      content:
        "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at privacy@welkee.in. We will respond within 30 days.",
    },
    {
      title: "7. Changes to This Policy",
      content:
        "We may update this Privacy Policy periodically. We will notify users of significant changes via email or a prominent notice on our website. Continued use of WELKEE after changes constitutes acceptance.",
    },
    {
      title: "8. Contact",
      content:
        "For privacy-related queries, contact our Data Protection Officer at privacy@welkee.in or write to: WELKEE Pvt. Ltd., 4th Floor, Tech Tower, Bengaluru, Karnataka 560001.",
    },
  ];

  return (
    <main
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      data-ocid="privacy.page"
    >
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Last updated: January 1, 2025
        </p>

        <div className="space-y-5">
          {sections.map(({ title, content }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card"
            >
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
