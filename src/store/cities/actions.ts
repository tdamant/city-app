import {City, CityActionTypes, UPDATE_CITIES} from "./types";

export function updateCities(cities: City[]): CityActionTypes {
  return {
    type: UPDATE_CITIES,
    payload: cities
  }
}