"use client";

import React from "react";
import {
  PokemonType,
  POKEMON_TYPES,
  getTypeColor,
} from "../types/pokemonTypes";

interface TypeFilterProps {
  selectedTypes: PokemonType[];
  onTypeToggle: (type: PokemonType) => void;
  onClearTypes: () => void;
}

export const TypeFilter = ({
  selectedTypes,
  onTypeToggle,
  onClearTypes,
}: TypeFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={onClearTypes}
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
          onClick={() => onTypeToggle(type)}
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
  );
};
