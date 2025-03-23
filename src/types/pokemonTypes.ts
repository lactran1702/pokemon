export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export const getTypeColor = (type: PokemonType): string => {
  const colors: Record<PokemonType, string> = {
    normal: "bg-gray-400 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-black",
    grass: "bg-green-500 text-white",
    ice: "bg-blue-200 text-black",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-600 text-white",
    flying: "bg-indigo-400 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-green-400 text-white",
    rock: "bg-yellow-800 text-white",
    ghost: "bg-purple-700 text-white",
    dragon: "bg-indigo-600 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-600 text-white",
    fairy: "bg-pink-300 text-black",
  };
  return colors[type] || "bg-gray-400 text-white";
};
