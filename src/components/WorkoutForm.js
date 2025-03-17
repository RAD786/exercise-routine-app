import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const WorkoutForm = ({ onSave, editingExercise, onCancel }) => {
  const [exercise, setExercise] = useState({ name: "", sets: "", reps: "", weight: "" });

  // Populate form fields when editing an exercise
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
    setExercise({ name: "", sets: "", reps: "", weight: "" }); // Reset form
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Exercise Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={exercise.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Sets</Form.Label>
        <Form.Control
          type="number"
          name="sets"
          value={exercise.sets}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Reps</Form.Label>
        <Form.Control
          type="number"
          name="reps"
          value={exercise.reps}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Weight (lbs)</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={exercise.weight}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant={editingExercise ? "warning" : "secondary"} type="submit">
        {editingExercise ? "Update Exercise" : "Add Exercise"}
      </Button>

      {editingExercise && (
        <Button variant="secondary" className="ms-2" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </Form>
  );
};

export default WorkoutForm;
