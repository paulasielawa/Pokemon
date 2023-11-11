import "./MainPage.css";
import pokemonLogo from "../assets/pokemon-logo-png.png";

function MainPage() {
  return (
    <div className="main-page">
      <img src={pokemonLogo} alt="Pokemon Logo" className="pokemon-logo" />
      <div className="card-container">
        {/* This container will be yellow and hold your main content */}
        Temporary content
      </div>
    </div>
  );
}

export default MainPage;
