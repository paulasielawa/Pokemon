import { Pokemon, PokemonSimple } from "../model/pokemon";

type GetPokemonsProps = {
  id?: number;
  name?: string;
};

export function usePokemonService() {
  const apiRoot = "https://pokeapi.co/api/v2/";

  const getPokemon = async ({
    id,
    name,
  }: GetPokemonsProps): Promise<Pokemon> => {
    try {
      return (await fetch(`${apiRoot}pokemon/${id ? id : name}`)).json();
    } catch (error) {
      throw new Error(`Failed to fetch - ${error}`);
    }
  };

  const getAllPokemonNames = async (): Promise<{
    results: PokemonSimple[];
  }> => {
    try {
      return (await fetch(`${apiRoot}pokemon?limit=1292`)).json();
    } catch (error) {
      throw new Error(`Failed to fetch - ${error}`);
    }
  };

  return { getPokemon, getAllPokemonNames };
}
