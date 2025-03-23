export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
      showdown: {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
