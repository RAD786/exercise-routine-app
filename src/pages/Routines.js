import { useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";

const routines = {
  Beginner: ["Push-ups - 10 reps", "Squats - 15 reps", "Jumping Jacks - 30 secs"],
  Intermediate: ["Burpees - 15 reps", "Lunges - 20 reps", "Plank - 1 min"],
  Advanced: ["Deadlifts - 3 sets", "Pull-ups - 3 sets", "Box Jumps - 20 reps"]
};

const Routines = () => {
  const [selectedRoutine, setSelectedRoutine] = useState("Beginner");

  return (
    <Container>
      <h2>Select a Routine</h2>
      {["Beginner", "Intermediate", "Advanced"].map(level => (
        <Button key={level} className="m-2" onClick={() => setSelectedRoutine(level)}>
          {level}
        </Button>
      ))}

      <h3 className="mt-4">{selectedRoutine} Routine</h3>
      <ListGroup>
        {routines[selectedRoutine].map((exercise, index) => (
          <ListGroup.Item key={index}>{exercise}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Routines;
