import { PokemonDetail, PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=100000&offset=0`);
  return response.json();
};

export const fetchPokemonDetail = async (
  url: string
): Promise<PokemonDetail> => {
  const response = await fetch(url);
  return response.json();
};
