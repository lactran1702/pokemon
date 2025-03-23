import { useQuery } from "@tanstack/react-query";
import { PokemonDetail, PokemonListResponse } from "../types/pokemon";
import { fetchPokemonDetail, fetchPokemonList } from "../services/pokemonApi";

export const usePokemonList = (page: number = 1) => {
  return useQuery<PokemonListResponse>({
    queryKey: ["pokemonList", page],
    queryFn: () => fetchPokemonList(page),
  });
};

export const usePokemonDetail = (url: string) => {
  return useQuery<PokemonDetail>({
    queryKey: ["pokemon", url],
    queryFn: () => fetchPokemonDetail(url),
  });
};
