const Footer = () => {
    return (
      <footer className="bg-[#0b1220] text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
  
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">Tasko</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Organize. Plan. Deliver.<br />
              A simple project management app for students and professionals
              to manage tasks, teams, and progress with clarity.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
  
          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Task Management</li>
              <li className="hover:text-white cursor-pointer">Team Collaboration</li>
              <li className="hover:text-white cursor-pointer">Progress Tracking</li>
              <li className="hover:text-white cursor-pointer">Analytics (Coming Soon)</li>
            </ul>
          </div>
  
          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Feedback</li>
              <li className="hover:text-white cursor-pointer">Report a Bug</li>
            </ul>
          </div>
  
        </div>
  
        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Tasko. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Built for productivity, clarity, and teamwork.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  