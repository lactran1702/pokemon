"use client";

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { PokemonDetail } from "../types/pokemon";
import { PokemonType } from "../types/pokemonTypes";
import { fetchPokemonDetail } from "../services/pokemonApi";
import { TypeBadge } from "./TypeBadge";
import { LoadingSkeleton } from "./LoadingSkeleton";

/**
 * Props for the PokemonItem component
 * @interface PokemonItemProps
 * @property {string} url - The URL to fetch Pokemon details from
 * @property {PokemonType[]} selectedTypes - Array of selected Pokemon types for filtering
 * @property {boolean} [priority=false] - Whether to prioritize loading this Pokemon's image
 */
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
      return <LoadingSkeleton count={1} />;
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
            <TypeBadge
              key={type.type.name}
              type={type.type.name as PokemonType}
            />
          ))}
        </div>
      </div>
    );
  }
);

PokemonItem.displayName = "PokemonItem";
