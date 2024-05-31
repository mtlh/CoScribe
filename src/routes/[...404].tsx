import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main class="max-w-7xl m-auto mt-10 min-h-screen">
      <Title>CoScribe - Not Found</Title>
      <HttpStatusCode code={404} />
      <main class="flex flex-col items-center justify-center h-[60dvh] px-4 md:px-6">
        <div class="space-y-4 text-center">
          <h1 class="text-8xl font-bold tracking-tighter">404</h1>
          <p class="text-gray-500 dark:text-gray-400 text-xl">Oops, the page you're looking for doesn't exist.</p>
          <a
            class="inline-flex h-10 items-center justify-center rounded-md bg-blue-400 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-400/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50"
            href="/"
          >
            Go back home
          </a>
        </div>
      </main>
    </main>
  );
}
