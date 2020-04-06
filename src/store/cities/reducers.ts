import {City, CityActionTypes, UPDATE_CITIES} from "./types";

const initialState: City[] = [];

export function cityReducer(
  state = initialState,
  action: CityActionTypes
) {
  switch (action.type) {
    case UPDATE_CITIES:
      return [...action.payload];
    default:
      return state
  }
}