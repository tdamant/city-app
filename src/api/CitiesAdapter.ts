import {City} from "../store/cities/types";
import {CitiesApi} from "./CitiesApi";


export type GroupedCities = {
  [stateName: string] : string[]
}

export class CitiesAdapter {
  constructor(private citiesApi = new CitiesApi()) {}

  async getCities(searchString: string): Promise<City[] | undefined> {
    try {
      const apiResponse = await this.citiesApi.getByString(searchString);
      if (apiResponse) {
        return apiResponse.data.map((city) => ({name: city.city, state: city.state}))
      }
    } catch (error) {
      console.log(error);
      return
    }
  }

  groupByState(cities: City[]): GroupedCities {
    return cities.reduce((acc, city) => {
      if(Object.keys(acc).includes(city.state)) {
        acc[city.state] = [...acc[city.state], city.name];
        return acc
      }
      acc[city.state] = [city.name];
      return acc
    }, {} as GroupedCities)
  }
}