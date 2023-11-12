import "./SearchBar.css";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import { usePokemonService } from "../service/pokemonApi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pokemon, PokemonSimple } from "../model/pokemon";
import { firstLetterUppercase } from "../utils/utils";

export type SearchBarProps = {
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon | undefined>>;
};

function SearchBar({ setSelectedPokemon }: SearchBarProps) {
  const { getAllPokemonNames } = usePokemonService();
  const [pokemonNames, setPokemonNames] = useState<PokemonSimple[]>([]);
  const [searchResults, setSearchResults] = useState<PokemonSimple[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { results: pokemons } = await getAllPokemonNames();
      setPokemonNames(pokemons);
    }
    fetchData();
  }, []);

  const handleOnSearch = (query: string): void => {
    const pokemonSearchResults = pokemonNames.filter((pokemon) =>
      pokemon.name.includes(query.toLowerCase())
    );
    setSearchResults(pokemonSearchResults);
  };

  return (
    <Row className="mt-3">
      <Col md={12}>
        <h3>Search by name</h3>
      </Col>
      <Col md={12} className="d-flex justify-content-center">
        <Form className="search-form">
          <FormControl
            type="text"
            onChange={(event) => {
              handleOnSearch(event.target.value);
            }}
            placeholder="Pokemon name"
            className="pokemon-input"
          />
        </Form>
      </Col>
      <Col md={12}>
        <div className="d-flex gap-2 justify-content-center mt-3">
          {searchResults.slice(0, 4).map((result) => (
            <Button
              onClick={(event) => {
                setSelectedPokemon({ name: event.target.value });
              }}
              value={result.name}
            >
              {firstLetterUppercase(result.name)}
            </Button>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default SearchBar;
