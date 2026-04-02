import { useState } from "react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.93C17.67 20.7 22 16.79 22 12z",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

function SocialIcon({
  label,
  href,
  path,
}: { label: string; href: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-700 hover:bg-[#FF8225] transition-colors"
    >
      <span className="sr-only">{label}</span>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const emails = JSON.parse(
        localStorage.getItem("welkee_newsletter") || "[]",
      );
      emails.push(email.trim());
      localStorage.setItem("welkee_newsletter", JSON.stringify(emails));
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#004085] dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold tracking-wider mb-3">
              WELKEE
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              India&apos;s Most Trusted Hub for Real Bikes &amp; Scooters.
              Discover, compare, and get the best deals across India.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} {...s} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", page: "home" },
                { label: "All Vehicles", page: "all-vehicles" },
                { label: "Compare Bikes", page: "compare" },
                { label: "EMI Calculator", page: "emi" },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(page)}
                    className="text-blue-200 hover:text-white text-sm transition-colors hover:underline"
                    data-ocid="footer.link"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", page: "about" },
                { label: "Contact Us", page: "contact" },
                { label: "Find Dealers", page: "dealers" },
                { label: "Latest News", page: "news" },
                { label: "Privacy Policy", page: "privacy" },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => onNavigate(page)}
                    className="text-blue-200 hover:text-white text-sm transition-colors hover:underline"
                    data-ocid="footer.link"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white">
              Subscribe for Offers
            </h4>
            <p className="text-blue-200 text-sm mb-4">
              Get the latest deals and new launches in your inbox.
            </p>
            {subscribed ? (
              <div
                className="bg-green-600 text-white text-sm font-semibold rounded-lg px-4 py-3"
                data-ocid="newsletter.success_state"
              >
                ✓ You&apos;re subscribed! Thanks.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 py-2 rounded-lg text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-[#FF8225]"
                  data-ocid="newsletter.input"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="bg-[#FF8225] hover:bg-[#e06010] text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                  data-ocid="newsletter.submit_button"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-700 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-blue-300">
          <span>© {new Date().getFullYear()} WELKEE. All Rights Reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
