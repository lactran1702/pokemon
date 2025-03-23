import { PokemonList } from "@/components/PokemonList";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Welcome to Pokemon World
        </h1>
        <PokemonList />
      </div>
    </main>
  );
}
