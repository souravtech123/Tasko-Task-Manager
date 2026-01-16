export default function About() {
    return (
      <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
  
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
              🤔 What is Tasko?
            </span>
  
            <h2 className="text-4xl font-extrabold text-gray-900">
              Project Management, <br />
              but <span className="text-indigo-600">Student-Friendly</span>
            </h2>
  
            <p className="mt-5 text-gray-600 text-lg">
              Tasko is a simple and fun project management platform designed
              especially for school and college students.
              No complex tools. No confusion. Just clear progress.
            </p>
          </div>
  
          {/* Feature Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
  
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl">
                📂
              </div>
              <h3 className="mt-4 text-xl font-bold">Organize Projects</h3>
              <p className="mt-2 text-gray-600">
                Keep all your subjects, projects, and files neatly organized in
                one place.
              </p>
            </div>
  
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                ✅
              </div>
              <h3 className="mt-4 text-xl font-bold">Track Tasks Easily</h3>
              <p className="mt-2 text-gray-600">
                Know what to do, when to do it, and what’s already completed — at
                a glance.
              </p>
            </div>
  
            <div className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-1 transition">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="mt-4 text-xl font-bold">Submit with Confidence</h3>
              <p className="mt-2 text-gray-600">
                Upload assignments and projects on time without last-minute panic.
              </p>
            </div>
  
          </div>
  
          {/* Bottom Note */}
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-700 font-medium">
              Built by students, for students — because managing projects
              shouldn’t feel like another exam 😄
            </p>
          </div>
  
        </div>
      </section>
    );
  }
  