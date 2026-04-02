import { useState } from "react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      data-ocid="contact.page"
    >
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Contact Us
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          We&apos;d love to hear from you. Send us a message!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            {submitted ? (
              <div
                className="text-center py-10"
                data-ocid="contact.success_state"
              >
                <p className="text-5xl mb-3">✅</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  We&apos;ll get back to you at contact@welkee.com within 24
                  hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-4 text-sm text-[#004085] dark:text-blue-400 hover:underline"
                  data-ocid="contact.secondary_button"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085]"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    rows={5}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004085] resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#004085] hover:bg-[#002d5e] text-white font-bold py-3 rounded-xl transition-colors"
                  data-ocid="contact.submit_button"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            {[
              {
                icon: "📍",
                title: "Our Office",
                lines: ["WELKEE Pvt. Ltd.", "Available Pan India"],
              },
              {
                icon: "📞",
                title: "Phone",
                lines: ["Request a Call Back", "Mon–Sat, 9 AM – 6 PM"],
              },
              {
                icon: "✉️",
                title: "Email",
                lines: ["contact@welkee.com"],
              },
            ].map(({ icon, title, lines }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card flex gap-4"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white mb-1">
                    {title}
                  </p>
                  {lines.map((l) => (
                    <p
                      key={l}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
