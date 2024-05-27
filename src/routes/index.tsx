import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main class="max-w-7xl m-auto mt-10">
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
