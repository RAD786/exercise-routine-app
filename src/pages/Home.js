import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import bgImage from "../app/assets/img/fitness-background.png";

const Home = () => {
  return (
    <Container
      fluid
      className="home-container d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "90vh",
        width: "100%",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
      }}
    >
      <h2 className="home-hero-title">Welcome to the Exercise Routine App</h2>
      <p className="home-hero-subtitle">Select an option to get started:</p>
      <Button color="primary" tag={Link} to="/create" className="m-2 home-hero-button">
        Create a Workout
      </Button>
      <Button color="success" tag={Link} to="/routines" className="m-2 home-hero-button">
        Follow a Routine
      </Button>
    </Container>
  );
};

export default Home;
