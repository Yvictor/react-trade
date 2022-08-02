import { createSlice } from "@reduxjs/toolkit";
export const contractSlice = createSlice({
  name: "Contracts",
  initialState: {},
  reducers: {
    addContracts: (state, action) => {
        action.payload.contracts.forEach(contract => {            
            state[
              `${contract.security_type}/${contract.exchange}/${contract.code}`
            ] = contract;
        });
      },
      
  },
});

export const { addContracts } = contractSlice.actions;

export default contractSlice.reducer;
