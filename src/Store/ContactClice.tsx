import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [] as any[],
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    deleteContact(state, action) {
      const userId = action.payload;
      return state.filter((user) => user.id !== userId);
    },
    editContact(state, action) {
      const updatedUser = action.payload;
      const index = state.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        // Update only the changed properties
        state[index] = {
          ...state[index], // Keep existing properties
          ...updatedUser, // Overwrite with updated properties
        };
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = userSlice.actions;
export default userSlice.reducer;
