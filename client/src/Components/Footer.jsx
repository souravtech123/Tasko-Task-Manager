const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Tasko<span className="text-blue-600">.v3</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Plan better. Work calmly. Ship confidently.
            <br />
            A premium project workspace built for students,
            developers, and small teams.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Product
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">Features</li>
            <li className="hover:text-gray-900 cursor-pointer">Projects</li>
            <li className="hover:text-gray-900 cursor-pointer">Idea Generator</li>
            <li className="hover:text-gray-900 cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* USE CASES */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Use cases
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">College Projects</li>
            <li className="hover:text-gray-900 cursor-pointer">Startup Teams</li>
            <li className="hover:text-gray-900 cursor-pointer">Solo Developers</li>
            <li className="hover:text-gray-900 cursor-pointer">Hackathons</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">Help Center</li>
            <li className="hover:text-gray-900 cursor-pointer">Feedback</li>
            <li className="hover:text-gray-900 cursor-pointer">Report a Bug</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © 2026 Tasko. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Built with ❤️ by a solo developer.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
