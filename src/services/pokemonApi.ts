import { PokemonDetail, PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";
const ITEMS_PER_PAGE = 24;

export const fetchPokemonList = async (
  page: number = 1
): Promise<PokemonListResponse> => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
  );
  return response.json();
};

export const fetchPokemonDetail = async (
  url: string
): Promise<PokemonDetail> => {
  const response = await fetch(url);
  return response.json();
};
