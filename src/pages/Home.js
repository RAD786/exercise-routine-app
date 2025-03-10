import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h2>Welcome to the Exercise Routine App</h2>
      <p>Select an option to get started:</p>
      <Button variant="primary" as={Link} to="/create" className="m-2">
        Create a Workout
      </Button>
      <Button variant="success" as={Link} to="/routines" className="m-2">
        Follow a Routine
      </Button>
    </Container>
  );
};

export default Home;
