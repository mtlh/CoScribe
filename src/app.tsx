import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>CoScribe - A collaborative writing platform</Title>
          <nav class="p-6 shadow-md top-0 sticky z-50 bg-slate-50">
            <div class="flex justify-between items-center flex-wrap md:text-lg text-md">
              <div class="flex items-center md:gap-10 gap-6">
                <a class="flex items-center" href="/">
                  <img src="/logo.svg" alt="CoScribe Logo" class="h-10 mr-2" />
                  <h1 class="h1"><em class="text-blue-500">Co</em>Scribe</h1>
                </a>
                <a href="/about" class="hover:underline">About</a>
                <a href="/listen/1" class="hover:underline">Listen (1)</a>
              </div>
              <div class="flex items-center md:gap-10 gap-6">
                <a href="/login" class="hover:underline">Sign Up</a>
                <a href="/login" class="hover:underline">Log In</a>
              </div>
            </div>
          </nav>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
