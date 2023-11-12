export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  types: PokemonType[];
  moves: PokemonMove[];
  abilities: PokemonAbility[];
  url: string;
};

export type PokemonSimple = Pick<Pokemon, "name" | "url">;

export type PokemonMove = {
  move: {
    name: string;
  };
};

export type PokemonAbility = {
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
