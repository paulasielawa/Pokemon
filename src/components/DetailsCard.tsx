import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Badge } from "react-bootstrap";
import { Pokemon } from "../model/pokemon";

type DetailsCardProps = {
  pokemon: Pokemon;
};

function DetailsCard({ pokemon }: DetailsCardProps) {
  const images = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_shiny,
  ].filter(Boolean);

  let cardWidth;
  switch (images.length) {
    case 0:
    case 1:
      cardWidth = "18rem";
      break;
    case 2:
      cardWidth = "30rem";
      break;
    case 3:
    case 4:
      cardWidth = "60rem";
      break;
    default:
      cardWidth = "30rem";
      break;
  }

  return (
    <Card style={{ width: cardWidth }}>
      <div className="d-flex justify-content-center">
        {images.map((img, index) => (
          <Card.Img key={index} variant="top" src={img!} />
        ))}
      </div>
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

export default DetailsCard;
