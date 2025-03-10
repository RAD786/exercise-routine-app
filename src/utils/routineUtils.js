export const MAX_ROUTINES = 5; // Max number of routines allowed

// Add an exercise to the current routine
export const addExercise = (exercise, setExercise, currentExercises, setCurrentExercises) => {
  if (exercise.name && exercise.sets && exercise.reps && exercise.weight) {
    setCurrentExercises([...currentExercises, { ...exercise, id: Date.now() }]); // Assign unique ID
    setExercise({ name: "", sets: "", reps: "", weight: "" }); // Reset form
  }
};

// Save a new routine (including exercises)
export const saveRoutine = (routineName, currentExercises, routines, setRoutines, setRoutineName, setCurrentExercises) => {
  if (routineName.trim() === "" || currentExercises.length === 0) {
    alert("Please enter a routine name and add at least one exercise.");
    return;
  }

  if (routines.length >= MAX_ROUTINES) {
    alert("You have reached the maximum number of routines.");
    return;
  }

  const newRoutine = {
    id: Date.now(),
    name: routineName,
    exercises: [...currentExercises],
  };

  setRoutines([...routines, newRoutine]);
  setRoutineName(""); // Reset routine name input
  setCurrentExercises([]); // Clear exercises for the next routine
};

// Delete a routine
export const deleteRoutine = (id, routines, setRoutines) => {
  setRoutines(routines.filter((routine) => routine.id !== id));
};

// Edit a routine (reloads exercises for modification)
export const editRoutine = (id, routines, setRoutines, setRoutineName, setCurrentExercises) => {
  const routineToEdit = routines.find((routine) => routine.id === id);
  setRoutineName(routineToEdit.name);
  setCurrentExercises(routineToEdit.exercises);
  setRoutines(routines.filter((routine) => routine.id !== id)); // Remove old routine
};

// Delete an exercise from a routine
export const deleteExercise = (routineId, exerciseId, routines, setRoutines) => {
  const updatedRoutines = routines.map((routine) =>
    routine.id === routineId
      ? { ...routine, exercises: routine.exercises.filter((exercise) => exercise.id !== exerciseId) }
      : routine
  );
  setRoutines(updatedRoutines);
};

// Edit an exercise inside a routine
export const editExercise = (routineId, exerciseId, newExercise, routines, setRoutines) => {
  const updatedRoutines = routines.map((routine) =>
    routine.id === routineId
      ? {
          ...routine,
          exercises: routine.exercises.map((exercise) =>
            exercise.id === exerciseId ? { ...newExercise, id: exerciseId } : exercise
          ),
        }
      : routine
  );
  setRoutines(updatedRoutines);
};
