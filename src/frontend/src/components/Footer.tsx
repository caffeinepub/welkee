import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "welkee";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="bg-white border-t border-gray-200 mt-8"
      data-ocid="footer.section"
    >
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-6">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-black text-2xl text-welkee-blue tracking-widest block mb-3">
              WELKEE
            </span>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              India's trusted motorcycle marketplace. Compare prices, specs, and
              find the best deals near you.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-100 hover:bg-welkee-blue hover:text-white text-gray-500 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out"
                  data-ocid="footer.button"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                "New Bikes",
                "Scooters",
                "Electric",
                "Used Bikes",
                "Upcoming Bikes",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-welkee-blue transition-colors"
                    data-ocid="footer.link"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                "About Us",
                "Contact Us",
                "Careers",
                "Advertise With Us",
                "Privacy Policy",
                "Terms of Use",
              ].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-welkee-blue transition-colors"
                    data-ocid="footer.link"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2 uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Get latest bikes, offers &amp; news.
            </p>
            {subscribed ? (
              <p
                className="text-green-600 text-sm font-semibold"
                data-ocid="footer.success_state"
              >
                ✓ You're subscribed!
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="Your email address"
                  className="w-full h-10 px-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-welkee-blue"
                  data-ocid="footer.input"
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="w-full bg-welkee-orange hover:bg-welkee-orange-dark text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
                  data-ocid="footer.submit_button"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 font-medium">
            Copyright {new Date().getFullYear()} Welkee
          </p>
          <p className="text-xs text-gray-400">
            Powered by{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-welkee-blue hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
          {/* Discrete admin link */}
          <a
            href="/admin"
            className="text-xs text-gray-300 hover:text-gray-400 transition-colors"
            aria-label="Admin"
            data-ocid="footer.link"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
