import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Iresponse } from '../interfases/interfases';

export interface init {
  value: Iresponse[];
}

const initialState: init = {
  value: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Iresponse>) => {
      state.value.push(action.payload);
    },

    remove: (state, action: PayloadAction<Iresponse>) => {
      state.value = state.value.filter(
        (item) => item.name !== action.payload.name
      );
    },
    distroyer: (state) => {
      state.value.length = 0;
    },
  },
});

export const { add, remove, distroyer } = counterSlice.actions;
export default counterSlice.reducer;
