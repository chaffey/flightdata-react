import api from '../api';

export interface AirportResponse {
  raw: string;
  icao: string;
  time: string;
  [key: string]: any;
}

export const fetchAirport = async (icaoCode: string) : Promise <AirportResponse> => {
  const response = await api.get(`/full/${icaoCode}`);
  return response.data;
};
