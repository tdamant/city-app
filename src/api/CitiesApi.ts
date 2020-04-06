type ApiResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: { city: string, state: string }[]
}

export interface CitiesApiInterface {
  getByString: (searchString: string) => Promise<ApiResponse | undefined>
}

export class FakeCitiesApi implements CitiesApiInterface {
  async getByString(searchString: string) {
    const successfulResponse = {
      page: 1,
      per_page: 10,
      total: 10,
      total_pages: 1,
      data: [
        {
          city: "Abbeville",
          state: "Louisiana"
        },
        {
          city: "Aberdeen",
          state: "Maryland"
        },
        {
          city: 'MarylandCity',
          state: 'Maryland'
        }
      ]
    };
    if (searchString === 'a') {
      return successfulResponse
    }
    throw new Error('something went wrong getting cities')
  }
}

export class CitiesApi implements CitiesApiInterface {
  async getByString(searchString: string): Promise<ApiResponse | undefined> {
    const apiResponse = await fetch(`https://jsonmock.hackerrank.com/api/cities/?city=${searchString}`, {
      method: 'GET'
    });
    if (apiResponse.status === 200) {
      return JSON.parse(await apiResponse.text())
    }
  }
}