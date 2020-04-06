import {CitiesAdapter} from "../CitiesAdapter";
import {FakeCitiesApi} from "../CitiesApi";
import {City} from "../../store/cities/types";

describe('CitiesAdapter', () => {
  const fakeApi = new FakeCitiesApi();
  const citiesAdapter = new CitiesAdapter(fakeApi);
  describe('getCities', () => {
    it('returns an array of cities if api returns cities', async () => {
      const cities = await citiesAdapter.getCities('a');
      expect(cities).toEqual([
        {
          name: 'Abbeville',
          state: 'Louisiana'
        },
        {
          name: 'Aberdeen',
          state: 'Maryland'
        },
        {
          name: 'MarylandCity',
          state: 'Maryland'
        }
      ])
    });
    it('handles the api erroring', async () => {
      const cities = await citiesAdapter.getCities('causes api to error');
      expect(cities).toBe(undefined)
    })
  });
  describe('groupByState', () => {
    it('groups all cities by state', async () => {
      const cities = await citiesAdapter.getCities('a');
      const groupedCities = citiesAdapter.groupByState(cities as City[]);
      expect(groupedCities).toEqual(
        {
          'Louisiana': ['Abbeville'],
          'Maryland': ['Aberdeen', 'MarylandCity']
        }
      )
    })
  })
});