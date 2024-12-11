import { store } from './store';
import { counterSlice } from './reduser';
import { request } from '../Response/request';
import { describe, it, expect } from 'vitest';

describe('Redux Store', () => {
  it('should create a store with the correct reducers', () => {
    const state = store.getState();

    expect(state[counterSlice.name]).toBeDefined();
    expect(state[request.reducerPath]).toBeDefined();
  });
});
