import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: (() => {
    try {
      const storedPastes = localStorage.getItem("pastes");
      return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
      console.error("Error parsing pastes from localStorage:", error);
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(paste => paste._id === updatedPaste._id);
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes reset successfully");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter(paste => paste._id !== pasteId);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted successfully");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
