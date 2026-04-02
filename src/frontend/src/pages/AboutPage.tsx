export function AboutPage() {
  const team = [
    { name: "Arjun Mehta", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Priya Kapoor", role: "Head of Product", emoji: "👩‍💻" },
    { name: "Ravi Sharma", role: "Lead Engineer", emoji: "👨‍🔧" },
    { name: "Neha Singh", role: "Marketing Director", emoji: "👩‍🎨" },
  ];

  return (
    <main
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      data-ocid="about.page"
    >
      {/* Hero */}
      <section className="welkee-gradient py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">
          About WELKEE
        </h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
          India’s most trusted digital showroom for bikes and scooters.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            WELKEE was founded in 2022 with a single mission: to make buying a
            two-wheeler in India as easy, transparent, and joyful as possible.
            We believe every Indian deserves access to unbiased information,
            real prices, and genuine offers—whether they’re buying their first
            scooter or upgrading to a premium motorcycle.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: "📊",
              title: "Transparency",
              desc: "Real ex-showroom prices with no hidden charges or misleading claims.",
            },
            {
              icon: "⚡",
              title: "Speed",
              desc: "Get offers, compare models, and calculate EMI in seconds.",
            },
            {
              icon: "🤝",
              title: "Trust",
              desc: "Verified dealerships and genuine user reviews you can rely on.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card text-center"
            >
              <span className="text-4xl block mb-3">{icon}</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-5">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map(({ name, role, emoji }) => (
              <div
                key={name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card text-center"
              >
                <span className="text-5xl block mb-2">{emoji}</span>
                <p className="font-bold text-sm text-gray-900 dark:text-white">
                  {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
