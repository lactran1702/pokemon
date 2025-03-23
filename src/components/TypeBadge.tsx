import React from "react";
import { PokemonType, getTypeColor } from "../types/pokemonTypes";

interface TypeBadgeProps {
  type: PokemonType;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(
        type
      )}`}
    >
      {type}
    </span>
  );
};
