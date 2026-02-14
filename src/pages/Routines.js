import { useState } from "react";
import { Container } from "react-bootstrap";
import RoutineSelector from "../components/RoutineSelector";

const Routines = () => {
  const [, setSelectedRoutine] = useState(null);

  return (
    <Container className="my-4">
      <h2>Pre-Built Workout Routines</h2>
      <RoutineSelector onSelectRoutine={setSelectedRoutine} />
    </Container>
  );
};

export default Routines;
