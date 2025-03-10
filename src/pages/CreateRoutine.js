import { useState } from "react";
import { Container, Form, Button, ListGroup, Card } from "react-bootstrap";
import { Pencil, XCircle } from "react-bootstrap-icons";
import {
  addExercise,
  saveRoutine,
  deleteRoutine,
  editRoutine,
  deleteExercise,
  editExercise,
  MAX_ROUTINES,
} from "../utils/routineUtils";

const CreateRoutine = () => {
  const [routineName, setRoutineName] = useState("");
  const [routines, setRoutines] = useState([]);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [exercise, setExercise] = useState({ name: "", sets: "", reps: "", weight: "" });
  const [editingExercise, setEditingExercise] = useState(null);

  return (
    <Container className="my-4">
      <h2>Create Your Workout Routine</h2>

      {/* Routine Name Input */}
      <Form.Group className="mb-3">
        <Form.Label>Routine Name</Form.Label>
        <Form.Control
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Enter Routine Name"
        />
      </Form.Group>

      {/* Exercise Form */}
      <h4>{editingExercise ? "Edit Exercise" : "Add Exercise"}</h4>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Exercise Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Sets</Form.Label>
          <Form.Control
            type="number"
            name="sets"
            value={exercise.sets}
            onChange={(e) => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Reps</Form.Label>
          <Form.Control
            type="number"
            name="reps"
            value={exercise.reps}
            onChange={(e) => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Weight (lbs)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={exercise.weight}
            onChange={(e) => setExercise({ ...exercise, [e.target.name]: e.target.value })}
          />
        </Form.Group>

        <Button
          variant={editingExercise ? "warning" : "secondary"}
          className="mt-2"
          onClick={() => {
            if (editingExercise) {
              editExercise(editingExercise.routineId, editingExercise.id, exercise, routines, setRoutines);
              setEditingExercise(null);
            } else {
              addExercise(exercise, setExercise, currentExercises, setCurrentExercises);
            }
          }}
        >
          {editingExercise ? "Update Exercise" : "Add Exercise"}
        </Button>
      </Form>

      {/* ✅ List of Exercises BEFORE Saving Routine */}
      {currentExercises.length > 0 && (
        <>
          <h4 className="mt-4">Exercises in This Routine</h4>
          <ListGroup>
            {currentExercises.map((ex) => (
              <ListGroup.Item key={ex.id} className="d-flex justify-content-between align-items-center">
                {ex.name} - {ex.sets} Sets x {ex.reps} Reps @ {ex.weight} lbs
                <div>
                  <Pencil
                    className="text-warning me-2"
                    role="button"
                    onClick={() => setEditingExercise({ id: ex.id, routineId: null })}
                  />
                  <XCircle
                    className="text-danger"
                    role="button"
                    onClick={() => setCurrentExercises(currentExercises.filter((item) => item.id !== ex.id))}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}

      {/* Save Routine Button */}
      <Button
        className="mt-3"
        variant="success"
        onClick={() => saveRoutine(routineName, currentExercises, routines, setRoutines, setRoutineName, setCurrentExercises)}
      >
        Save Routine
      </Button>

      {/* List of Saved Routines */}
      {routines.map((routine) => (
        <Card className="mb-3" key={routine.id}>
          <Card.Body>
            <Card.Title>{routine.name}</Card.Title>
            <ListGroup>
              {routine.exercises.map((ex) => (
                <ListGroup.Item key={ex.id} className="d-flex justify-content-between align-items-center">
                  {ex.name} - {ex.sets} Sets x {ex.reps} Reps @ {ex.weight} lbs
                  <div>
                    <Pencil
                      className="text-warning me-2"
                      role="button"
                      onClick={() => setEditingExercise({ id: ex.id, routineId: routine.id })}
                    />
                    <XCircle
                      className="text-danger"
                      role="button"
                      onClick={() => deleteExercise(routine.id, ex.id, routines, setRoutines)}
                    />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button className="mt-2" variant="danger" onClick={() => deleteRoutine(routine.id, routines, setRoutines)}>
              Delete Routine
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CreateRoutine;
