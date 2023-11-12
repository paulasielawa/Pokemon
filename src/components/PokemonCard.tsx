import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Pokemon } from "../model/pokemon";
import { Badge } from "react-bootstrap";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card style={{ width: "18rem" }}>
      {pokemon.sprites.front_default && (
        <Card.Img variant="top" src={pokemon.sprites.front_default} />
      )}
      <Card.Body>
        <Card.Title>{pokemon.name.toLocaleUpperCase()}</Card.Title>
        <div className="d-flex gap-2 justify-content-center">
          {pokemon.types.map((t) => (
            <Badge
              bg=""
              style={{ backgroundColor: getColorForType(t.type.name) }}
            >
              {t.type.name}
            </Badge>
          ))}
        </div>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Weight: {pokemon.weight}</ListGroup.Item>
        <ListGroup.Item>Height: {pokemon.height}</ListGroup.Item>
        <ListGroup.Item>
          Total number of moves: {pokemon.moves.length}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

const colorTypeMap: Record<string, string> = {
  grass: "#AFE1AF",
  poison: "#AA4203",
  fire: "#EE214A",
  normal: "#c7ad2c",
  water: "#3d6ebf",
  electric: "#ffda47",
};

const defaultColor = "#6b6e73"; // Define your default color here

function getColorForType(type: string): string {
  return colorTypeMap[type] || defaultColor;
}

export default PokemonCard;
