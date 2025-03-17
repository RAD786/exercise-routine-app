import { useState } from "react";
import { Container, ListGroup, Card, Button } from "react-bootstrap";
import { Pencil, XCircle } from "react-bootstrap-icons";
import WorkoutForm from "../components/WorkoutForm";
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
  const [editingExercise, setEditingExercise] = useState(null);
  const [editingRoutine, setEditingRoutine] = useState(null);

  return (
    <Container className="my-4">
      <h2>Create Your Workout Routine</h2>

      {/* Routine Name Input */}
      <div className="mb-3 d-flex align-items-center">
        <input
          type="text"
          className="form-control"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Enter Routine Name"
        />
        {editingRoutine && (
          <Button
            variant="success"
            className="ms-2"
            onClick={() => {
              const updatedRoutines = routines.map((routine) =>
                routine.id === editingRoutine ? { ...routine, name: routineName } : routine
              );
              setRoutines(updatedRoutines);
              setEditingRoutine(null);
              setRoutineName("");
            }}
          >
            Save Name
          </Button>
        )}
      </div>

      {/* WorkoutForm for Adding/Editing Exercises */}
      <WorkoutForm
        onSave={(exercise) => {
          if (editingExercise) {
            editExercise(editingExercise.routineId, editingExercise.id, exercise, routines, setRoutines);
            setEditingExercise(null);
          } else {
            addExercise(exercise, () => {}, currentExercises, setCurrentExercises);
          }
        }}
        editingExercise={editingExercise}
        onCancel={() => setEditingExercise(null)}
      />

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
            <Card.Title className="d-flex justify-content-between align-items-center">
              {editingRoutine === routine.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                />
              ) : (
                routine.name
              )}
              <div>
                {editingRoutine === routine.id ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      const updatedRoutines = routines.map((r) =>
                        r.id === routine.id ? { ...r, name: routineName } : r
                      );
                      setRoutines(updatedRoutines);
                      setEditingRoutine(null);
                      setRoutineName("");
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Pencil
                    className="text-primary"
                    role="button"
                    onClick={() => {
                      setEditingRoutine(routine.id);
                      setRoutineName(routine.name);
                    }}
                  />
                )}
              </div>
            </Card.Title>
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
