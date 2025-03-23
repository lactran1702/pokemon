import { useQuery } from "@tanstack/react-query";
import { PokemonDetail, PokemonListResponse } from "../types/pokemon";
import { fetchPokemonDetail, fetchPokemonList } from "../services/pokemonApi";

/**
 * Custom hook to fetch a paginated list of Pokemon
 * @param page - The page number to fetch (1-based)
 * @returns Query result containing the Pokemon list and loading/error states
 */
export const usePokemonList = (page: number = 1) => {
  return useQuery<PokemonListResponse>({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
  });
};

/**
 * Custom hook to fetch detailed information about a specific Pokemon
 * @param url - The URL of the Pokemon to fetch details for
 * @returns Query result containing the Pokemon's details and loading/error states
 */
export const usePokemonDetail = (url: string) => {
  return useQuery<PokemonDetail>({
    queryKey: ["pokemon", url],
    queryFn: () => fetchPokemonDetail(url),
  });
};
