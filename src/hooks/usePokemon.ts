import { useQuery } from "@tanstack/react-query";
import { PokemonDetail, PokemonListResponse } from "../types/pokemon";
import { fetchPokemonDetail, fetchPokemonList } from "../services/pokemonApi";

export const usePokemonList = () => {
  return useQuery<PokemonListResponse>({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemonList,
  });
};

export const usePokemonDetail = (url: string) => {
  return useQuery<PokemonDetail>({
    queryKey: ["pokemon", url],
    queryFn: () => fetchPokemonDetail(url),
  });
};
