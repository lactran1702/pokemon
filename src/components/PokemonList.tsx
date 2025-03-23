"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { PokemonDetail, PokemonListResponse } from "../types/pokemon";
import { fetchPokemonList, fetchPokemonDetail } from "../services/pokemonApi";

const POKEMON_TYPES = [
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

type PokemonType = (typeof POKEMON_TYPES)[number];

const getTypeColor = (type: PokemonType): string => {
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

const PokemonItem = ({
  url,
  selectedTypes,
}: {
  url: string;
  selectedTypes: PokemonType[];
}) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonDetail(url)
      .then(setPokemon)
      .finally(() => setIsLoading(false));
  }, [url]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-4 animate-pulse">
        <div className="relative w-full aspect-[1/1] bg-gray-200 rounded" />
        <div className="h-6 bg-gray-200 rounded mt-2 w-3/4 mx-auto" />
        <div className="flex gap-2 justify-center mt-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  if (selectedTypes.length > 0) {
    const hasSelectedType = pokemon.types.some((type) =>
      selectedTypes.includes(type.type.name as PokemonType)
    );
    if (!hasSelectedType) return null;
  }

  const spriteUrl =
    pokemon.sprites.other.showdown.front_default ||
    pokemon.sprites.front_default;
  if (!spriteUrl) return null;

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-all duration-200">
      <div className="relative w-full aspect-[1/1]">
        <Image
          src={spriteUrl}
          alt={pokemon.name}
          fill
          className="object-contain"
          unoptimized
          priority={false}
        />
      </div>
      <h2 className="text-xl font-bold text-center capitalize mt-2 text-black">
        {pokemon.name}
      </h2>
      <div className="flex gap-2 justify-center mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`px-2 py-1 rounded-full text-sm font-medium capitalize
              ${getTypeColor(type.type.name as PokemonType)}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export const PokemonList = () => {
  const [page, setPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonList(page, selectedTypes)
      .then((response: PokemonListResponse) => {
        setPokemonList(response.results);
        setTotalCount(response.count);
      })
      .finally(() => setIsLoading(false));
  }, [page, selectedTypes]);

  const toggleType = (type: PokemonType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
  };

  const totalPages = useMemo(() => Math.ceil(totalCount / 24), [totalCount]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-lg font-semibold mb-4">
        Total count: {totalCount}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedTypes([])}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors
            ${
              selectedTypes.length === 0
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          All
        </button>
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize cursor-pointer transition-colors
              ${
                selectedTypes.includes(type)
                  ? getTypeColor(type)
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="relative w-full aspect-[1/1] bg-gray-200 rounded" />
              <div className="h-6 bg-gray-200 rounded mt-2 w-3/4 mx-auto" />
              <div className="flex gap-2 justify-center mt-2">
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {pokemonList.map((pokemon) => (
            <PokemonItem
              key={pokemon.name}
              url={pokemon.url}
              selectedTypes={selectedTypes}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
