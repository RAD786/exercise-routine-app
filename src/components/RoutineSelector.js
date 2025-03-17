import { useState } from "react";
import { Container, Button, ListGroup, Row, Col } from "react-bootstrap";

const routines = {
  Beginner: [
    { name: "Push-ups", sets: 3, reps: 10, weight: 0 },
    { name: "Squats", sets: 3, reps: 15, weight: 0 },
    { name: "Jumping Jacks", sets: 1, reps: 30, weight: 0 },
  ],
  Intermediate: [
    { name: "Burpees", sets: 3, reps: 15, weight: 0 },
    { name: "Lunges", sets: 3, reps: 20, weight: 0 },
    { name: "Plank", sets: 1, reps: "1 min", weight: 0 },
  ],
  Advanced: [
    { name: "Deadlifts", sets: 3, reps: 8, weight: "Heavy" },
    { name: "Pull-ups", sets: 3, reps: 10, weight: 0 },
    { name: "Box Jumps", sets: 3, reps: 20, weight: 0 },
  ],
};

const RoutineSelector = ({ onSelectRoutine }) => {
  const [selectedRoutine, setSelectedRoutine] = useState("Beginner");

  return (
    <Container className="mt-4">
      <h2>Select a Routine</h2>

      {/* Routine Selection Buttons */}
      <Row className="mb-4">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <Col xs="auto" key={level} className="p-1">
            <Button
              variant={selectedRoutine === level ? "success" : "primary"}
              onClick={() => {
                setSelectedRoutine(level);
                onSelectRoutine(routines[level]);
              }}
            >
              {level}
            </Button>
          </Col>
        ))}
      </Row>

      {/* Display Selected Routine */}
      <h3>{selectedRoutine} Routine</h3>
      <ListGroup>
        {routines[selectedRoutine].map((exercise, index) => (
          <ListGroup.Item key={index} className="text-start">
            {exercise.name} - {exercise.sets} Sets x {exercise.reps} Reps
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RoutineSelector;
