import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center">
      <h2>Welcome to the Exercise Routine App</h2>
      <p>Select an option to get started:</p>
      <Button color="primary" tag={Link} to="/create" className="m-2">
        Create a Workout
      </Button>
      <Button color="success" tag={Link} to="/routines" className="m-2">
        Follow a Routine
      </Button>
    </Container>
  );
};

export default Hero;
