export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Welcome to Robin Marsman
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A modern web application built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
              ✅ Successfully deployed to GitHub Pages
            </div>
          </header>

          {/* Tech Stack */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Next.js 16", desc: "React Framework" },
                { name: "TypeScript", desc: "Type Safety" },
                { name: "Tailwind CSS", desc: "Utility Styling" },
                { name: "GitHub Pages", desc: "Static Hosting" }
              ].map((tech, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Deployment Info */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
              Deployment Process
            </h2>
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-left">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-gray-700 dark:text-gray-300">Static export configuration for GitHub Pages compatibility</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-gray-700 dark:text-gray-300">Automated deployment via GitHub Actions workflow</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-gray-700 dark:text-gray-300">Push to main branch triggers automatic build and deploy</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-gray-600 dark:text-gray-400">
            <p>Built with ❤️ using modern web technologies</p>
            <p className="mt-2 text-sm">
              Repository: <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">remdd/robin-marsman</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
