import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const WorkoutForm = ({ onSave, editingExercise, onCancel }) => {
  const [exercise, setExercise] = useState({ name: "", sets: "", reps: "", weight: "" });

  useEffect(() => {
    if (editingExercise) {
      setExercise(editingExercise);
    }
  }, [editingExercise]);

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise.name || !exercise.sets || !exercise.reps || !exercise.weight) {
      alert("Please fill in all fields.");
      return;
    }
    onSave(exercise);
    setExercise({ name: "", sets: "", reps: "", weight: "" });
  };

  console.log("WorkoutForm is rendering!");

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-2">
        <Label>Exercise Name</Label>
        <Input type="text" name="name" value={exercise.name} onChange={handleChange} />
      </FormGroup>

      <FormGroup className="mb-2">
        <Label>Sets</Label>
        <Input type="number" name="sets" value={exercise.sets} onChange={handleChange} />
      </FormGroup>

      <FormGroup className="mb-2">
        <Label>Reps</Label>
        <Input type="number" name="reps" value={exercise.reps} onChange={handleChange} />
      </FormGroup>

      <FormGroup className="mb-2">
        <Label>Weight (lbs)</Label>
        <Input type="number" name="weight" value={exercise.weight} onChange={handleChange} />
      </FormGroup>

      <Button color={editingExercise ? "warning" : "secondary"} type="submit">
        {editingExercise ? "Update Exercise" : "Add Exercise"}
      </Button>

      {editingExercise && (
        <Button color="secondary" className="ms-2" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </Form>
  );
};

export default WorkoutForm;
