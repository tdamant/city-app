import {cityReducer} from "./reducers";

export interface City {
  name: string;
  state: string
}

export type CityState = ReturnType<typeof cityReducer>;

export const UPDATE_CITIES = 'UPDATE_CITIES';

interface UpdateCitiesAction {
  type: typeof UPDATE_CITIES
  payload: City[]
}

export type CityActionTypes = UpdateCitiesAction