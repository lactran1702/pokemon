"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { PokemonType } from "../types/pokemonTypes";
import { fetchPokemonList } from "../services/pokemonApi";
import { PokemonItem } from "./PokemonItem";
import { TypeFilter } from "./TypeFilter";
import { Pagination } from "./Pagination";
import { LoadingSkeleton } from "./LoadingSkeleton";

const ITEMS_PER_PAGE = 24;
const INITIAL_LOAD_COUNT = 12;

export const PokemonList = () => {
  const [page, setPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchPokemonList(page, selectedTypes);
        if (isMounted) {
          setPokemonList(response.results);
          setTotalCount(response.count);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch Pokemon list")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPokemons();

    return () => {
      isMounted = false;
    };
  }, [page, selectedTypes]);

  const toggleType = useCallback((type: PokemonType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
    setIsInitialLoad(true);
  }, []);

  const clearTypes = useCallback(() => {
    setSelectedTypes([]);
    setPage(1);
    setIsInitialLoad(true);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
    setIsInitialLoad(false);
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((p) => p + 1);
    setIsInitialLoad(false);
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / ITEMS_PER_PAGE),
    [totalCount]
  );

  const displayedPokemon = useMemo(() => {
    if (isInitialLoad) {
      return pokemonList.slice(0, INITIAL_LOAD_COUNT);
    }
    return pokemonList;
  }, [pokemonList, isInitialLoad]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Error loading Pokemon list. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-lg font-semibold mb-4">
        Total count: {totalCount}
      </div>

      <TypeFilter
        selectedTypes={selectedTypes}
        onTypeToggle={toggleType}
        onClearTypes={clearTypes}
      />

      {isLoading ? (
        <LoadingSkeleton count={INITIAL_LOAD_COUNT} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayedPokemon.map((pokemon, index) => (
            <PokemonItem
              key={pokemon.name}
              url={pokemon.url}
              selectedTypes={selectedTypes}
              priority={index < 6}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};
