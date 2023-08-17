import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: JSON.parse(localStorage.getItem("currentAdmin")) || null,
    isFetching: false,
    isAdmin:true,
    error: false,
    adminId:JSON.parse(localStorage.getItem("adminId")) || ""
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      if(action.payload.isAdmin){
        state.adminId=action.payload._id;
        localStorage.setItem("adminId", JSON.stringify(state.adminId));
        state.currentAdmin = action.payload
        localStorage.setItem("currentAdmin", JSON.stringify(state.currentAdmin));
      }
      else{
        state.isAdmin=false
      }
      // setTimeout(() => {
      //   localStorage.removeItem("currentAdmin");
      //   localStorage.removeItem("adminId");
      //   console.log("Expired data removed");
      // },  1 * 1000);

      // Start the timer to remove the expired data after 1 minute
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = adminSlice.actions;
export default adminSlice.reducer;
