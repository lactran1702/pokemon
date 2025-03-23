"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { PokemonDetail } from "../types/pokemon";
import { PokemonType, getTypeColor } from "../types/pokemonTypes";
import { fetchPokemonDetail } from "../services/pokemonApi";

interface PokemonItemProps {
  url: string;
  selectedTypes: PokemonType[];
  priority?: boolean;
}

export const PokemonItem = memo(
  ({ url, selectedTypes, priority = false }: PokemonItemProps) => {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      let isMounted = true;

      const fetchPokemon = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await fetchPokemonDetail(url);
          if (isMounted) {
            setPokemon(data);
          }
        } catch (err) {
          if (isMounted) {
            setError(
              err instanceof Error ? err : new Error("Failed to fetch Pokemon")
            );
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };

      fetchPokemon();

      return () => {
        isMounted = false;
      };
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

    if (error) {
      return (
        <div className="bg-white rounded-lg p-4 text-center text-red-500">
          Error loading Pokemon
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
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            loading={priority ? "eager" : "lazy"}
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
  }
);

PokemonItem.displayName = "PokemonItem";
