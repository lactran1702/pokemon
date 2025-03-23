import { PokemonDetail, PokemonListResponse } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";
const ITEMS_PER_PAGE = 24;

interface TypePokemon {
  pokemon: {
    name: string;
    url: string;
  };
}

interface TypeResponse {
  pokemon: TypePokemon[];
}

/**
 * Fetches Pokemon filtered by type
 * @param types - Array of Pokemon types to filter by
 * @returns Promise containing an array of Pokemon URLs
 */
const fetchPokemonByTypes = async (
  types: string[]
): Promise<{ name: string; url: string }[]> => {
  const typePromises = types.map((type) =>
    fetch(`${BASE_URL}/type/${type}`).then((res) => res.json())
  );

  const typeResults = (await Promise.all(typePromises)) as TypeResponse[];
  const pokemonUrls = new Set(
    typeResults.flatMap((result) =>
      result.pokemon.map((p: TypePokemon) => p.pokemon.url)
    )
  );

  return Array.from(pokemonUrls).map((url) => ({
    name: url.split("/").slice(-2)[0],
    url,
  }));
};

/**
 * Fetches a paginated list of Pokemon, optionally filtered by type
 * @param page - The page number to fetch (1-based)
 * @param types - Array of Pokemon types to filter by
 * @returns Promise containing the paginated Pokemon list response
 */
export const fetchPokemonList = async (
  page: number = 1,
  types: string[] = []
): Promise<PokemonListResponse> => {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  if (types.length > 0) {
    const allPokemon = await fetchPokemonByTypes(types);
    const paginatedResults = allPokemon.slice(offset, offset + ITEMS_PER_PAGE);

    return {
      count: allPokemon.length,
      next:
        offset + ITEMS_PER_PAGE < allPokemon.length
          ? `?offset=${offset + ITEMS_PER_PAGE}`
          : null,
      previous:
        offset > 0 ? `?offset=${Math.max(0, offset - ITEMS_PER_PAGE)}` : null,
      results: paginatedResults,
    };
  }

  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
  );
  return response.json();
};

/**
 * Fetches detailed information about a specific Pokemon
 * @param url - The URL of the Pokemon to fetch details for
 * @returns Promise containing the Pokemon's detailed information
 */
export const fetchPokemonDetail = async (
  url: string
): Promise<PokemonDetail> => {
  const response = await fetch(url);
  return response.json();
};
