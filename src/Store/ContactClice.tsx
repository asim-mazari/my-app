import { createSlice } from "@reduxjs/toolkit";

const userClice = createSlice({
  name: "user",
  initialState: [] as any[], // Add TypeScript comment here
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    }
  },
});
export { userClice };
export const { addContact } = userClice.actions;
