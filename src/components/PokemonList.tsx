"use client";

import React from "react";
import Image from "next/image";
import { usePokemonList, usePokemonDetail } from "../hooks/usePokemon";

export default PokemonList;

function PokemonItem({ url }: { url: string }) {
  const { data: pokemonDetail, isLoading } = usePokemonDetail(url);

  if (isLoading) return <div>Loading...</div>;
  if (!pokemonDetail) return null;

  const spriteUrl = pokemonDetail.sprites.other.showdown.front_default;

  if (!spriteUrl) return null;

  return (
    <li className="flex items-center gap-2">
      <Image
        src={spriteUrl}
        alt={pokemonDetail.name}
        width={35}
        height={53}
        className="w-20"
        unoptimized
      />
      <span className="capitalize">{pokemonDetail.name}</span>
    </li>
  );
}

function PokemonList(): React.ReactElement {
  const { data, isLoading, error } = usePokemonList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h2>Total Pokemon: {data.count}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((pokemon) => (
          <PokemonItem key={pokemon.name} url={pokemon.url} />
        ))}
      </ul>
    </div>
  );
}
