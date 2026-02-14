import { useState } from "react";
import { Container, ListGroup, ListGroupItem, Card, CardBody, CardTitle, Button, Input, Form } from "reactstrap";
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

  console.log("WorkoutForm: ", WorkoutForm);


  return (
    <Container className="my-4">
      <h2>Create Your Workout Routine</h2>

      <Form className="mb-3 d-flex align-items-center">
        <Input
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          placeholder="Enter Routine Name"
        />
        {editingRoutine && (
          <Button
            color="success"
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
      </Form>

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

      {currentExercises.length > 0 && (
        <>
          <h4 className="mt-4">Exercises in This Routine</h4>
          <ListGroup>
            {currentExercises.map((ex) => (
              <ListGroupItem key={ex.id} className="d-flex justify-content-between align-items-center">
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
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      )}

      <Button
        className="mt-3"
        color="success"
        onClick={() => saveRoutine(routineName, currentExercises, routines, setRoutines, setRoutineName, setCurrentExercises)}
      >
        Save Routine
      </Button>

      {routines.map((routine) => (
        <Card className="mb-3" key={routine.id}>
          <CardBody>
            <CardTitle tag="h5" className="d-flex justify-content-between align-items-center">
              {editingRoutine === routine.id ? (
                <Input
                  type="text"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                />
              ) : (
                routine.name
              )}
              <div>
                {editingRoutine === routine.id ? (
                  <Button
                    color="success"
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
            </CardTitle>
            <ListGroup>
              {routine.exercises.map((ex) => (
                <ListGroupItem key={ex.id} className="d-flex justify-content-between align-items-center">
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
                </ListGroupItem>
              ))}
            </ListGroup>
            <Button className="mt-2" color="danger" onClick={() => deleteRoutine(routine.id, routines, setRoutines)}>
              Delete Routine
            </Button>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default CreateRoutine;
