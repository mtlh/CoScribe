export default function Home() {
  return (
    <>
      <div style={{ "background-image": "url(https://www.washingtonpost.com/creativegroup/uploads/2022/01/17214556/image-assets_hero_desk-1.jpg)" }} class="min-h-60"></div>
      <main class="max-w-7xl m-auto mt-10 container mx-auto py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
          <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="space-y-6">
              <h1 class="md:text-[6rem] text-[4rem] md:py-2"><em class="text-blue-500">Co</em>Scribe</h1>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Collaborative Editing Made Simple</h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Bring your team together to create, edit, and review content seamlessly. Our collaborative editor makes it
                easy to work together in real-time.
              </p>
              <div>
                <a
                  class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  href="/login"
                  rel="ugc"
                >
                  Try it now
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://assets-global.website-files.com/645a9acecda2e0594fac6126/657c5d6268aea6c85dd4a063_tiptap-collaboration-hero.png"
                alt="Collaborative Editing"
                class="w-full h-auto"
                width="800"
                height="600"
                style="aspect-ratio: 800 / 600; object-fit: cover;" />
            </div>
          </section>
          <section class="mt-32">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Real-time Collaboration</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Work together in real-time, with changes instantly visible to your team.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Intuitive Interface</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Our clean and minimalist interface makes it easy to focus on your work.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Version Control</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Track changes, revert to previous versions, and collaborate with confidence.
                </p>
              </div>
            </div>
          </section>
        </main>
      </>
  );
}
