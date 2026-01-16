export default function Hero() {
    return (
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
  
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
              🎓 Built for Students & Colleges
            </span>
  
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Manage Projects. <br />
              <span className="text-indigo-600">Finish Tasks.</span> <br />
              Stress Less.
            </h1>
  
            <p className="mt-5 text-gray-600 text-lg">
              Tasko helps students organize projects, track tasks, collaborate
              with teams, and submit work — all in one simple dashboard.
            </p>
  
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                🚀 Get Started
              </button>
  
              <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                📘 View Demo
              </button>
            </div>
          </div>
  
          {/* Right Visual */}
          <div className="md:w-1/2 relative">
            <div className="relative bg-white rounded-3xl shadow-xl p-6">
              
              {/* Fake cards */}
              <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-4 mb-4">
                <p className="font-semibold text-indigo-700">Math Project</p>
                <span className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full">
                  In Progress
                </span>
              </div>
  
              <div className="flex items-center justify-between bg-green-50 rounded-xl p-4 mb-4">
                <p className="font-semibold text-green-700">Science Report</p>
                <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">
                  Completed
                </span>
              </div>
  
              <div className="flex items-center justify-between bg-yellow-50 rounded-xl p-4">
                <p className="font-semibold text-yellow-700">History PPT</p>
                <span className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-full">
                  Pending
                </span>
              </div>
            </div>
  
            {/* Decorative bubbles */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-200 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-200 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>
    );
  }
  