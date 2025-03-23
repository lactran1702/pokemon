import { PokemonList } from "@/components/PokemonList";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-4xl font-bold mt-8">
        Welcome to Pokemon world
      </h1>
      <PokemonList />
    </main>
  );
}
