import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routines: [],
};

const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {
    addRoutine: (state, action) => {
      state.routines.push(action.payload);
    },
    deleteRoutine: (state, action) => {
      state.routines = state.routines.filter(routine => routine.id !== action.payload);
    },
    editRoutine: (state, action) => {
      const { id, name } = action.payload;
      const routine = state.routines.find(r => r.id === id);
      if (routine) {
        routine.name = name;
      }
    },
  },
});

export const { addRoutine, deleteRoutine, editRoutine } = routinesSlice.actions;
export default routinesSlice.reducer;
