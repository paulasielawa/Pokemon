import "./MainPage.css";
import PokemonBall from "../assets/ball-pokemon.png";
import pokemonLogo from "../assets/pokemon-logo-png.png";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { usePokemonService } from "../service/pokemonApi";
import { Pokemon } from "../model/pokemon";
import PokemonCard from "./PokemonCard";
import { range } from "../utils/utils";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import DetailsCard from "./DetailsCard";

function MainPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const [{ start, end }, setCurrentRange] = useState({
    start: 1,
    end: 4,
  });

  const { getPokemon } = usePokemonService();

  useEffect(() => {
    async function fetchData() {
      range(start, end).forEach(async (id) => {
        const pokemon = await getPokemon({ id });
        setPokemons((prevPokemons) => {
          if (
            prevPokemons &&
            !prevPokemons.some(
              (existingPokemon) => existingPokemon.id === pokemon.id
            )
          ) {
            return [...prevPokemons, pokemon];
          }
          return prevPokemons;
        });
      });
    }

    fetchData();
  }, [start, end]);

  useEffect(() => {
    async function fetchData() {
      const pokemon = await getPokemon({ name: selectedPokemon?.name });
      setSelectedPokemon(pokemon);
    }

    fetchData();
  }, [selectedPokemon?.name]);

  const handleNextPage = () => {
    setPokemons([]);
    setCurrentRange({ start: start + 4, end: end + 4 });
  };

  const handlePreviousPage = () => {
    if (start !== 1) {
      setPokemons([]);
      setCurrentRange({ start: start - 4, end: end - 4 });
    }
  };

  return (
    <div className="main-page">
      <div className="logo-container">
        <img src={pokemonLogo} alt="Pokemon Logo" className="pokemon-logo" />
        <Image src={PokemonBall} alt="Pokemon Ball" className="pokemom-ball" />
      </div>
      <Container className="card-container">
        <SearchBar setSelectedPokemon={setSelectedPokemon} />
        <div className="d-flex justify-content-center mt-3 gap-5">
          {selectedPokemon?.id ? (
            <DetailsCard pokemon={selectedPokemon} />
          ) : (
            <Row>
              {pokemons.map((pokemon) => (
                <Col
                  xs={12}
                  md={6}
                  lg={3}
                  className=" d-flex justify-content-center"
                >
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                </Col>
              ))}
            </Row>
          )}
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          {selectedPokemon?.id ? (
            <Button onClick={() => setSelectedPokemon(undefined)}>Reset</Button>
          ) : (
            <>
              {start > 1 && <Button onClick={handlePreviousPage}>Prev</Button>}
              <Button onClick={handleNextPage}>Next</Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
