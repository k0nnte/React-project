import { describe, expect, test } from 'vitest';
import { Iresponse } from '../interfases/interfases';
import counterReducer, { add, remove, distroyer } from './reduser';

describe('counterSlice', () => {
  const initionalstate: { value: Iresponse[] } = { value: [] };

  const testitem: Iresponse = {
    name: 'Item1',
    birth_year: '',
    created: '',
    edited: '',
    eye_color: '',
    films: [],
    gender: '',
    hair_color: '',
    height: '',
    homeworld: '',
    mass: '',
    skin_color: '',
    species: [],
    starships: [],
    url: '',
    vehicles: [],
  };

  test('initional state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: [],
    });
  });

  test('add reduser', () => {
    const nextState = counterReducer(initionalstate, add(testitem));
    expect(nextState.value).toContainEqual(testitem);
  });
  test('should handle remove', () => {
    const populatedState = { value: [testitem] };
    const nextState = counterReducer(populatedState, remove(testitem));
    expect(nextState.value).not.toContainEqual(testitem);
  });

  test('should handle distroyer', () => {
    const populatedState = {
      value: [testitem, { ...testitem, name: 'Item2' }],
    };
    const nextState = counterReducer(populatedState, distroyer());
    expect(nextState.value).toEqual([]);
  });
});
