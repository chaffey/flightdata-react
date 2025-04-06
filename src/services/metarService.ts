import api from '../api';

export interface MetarResponse {
  raw: string;
  icao: string;
  time: string;
  [key: string]: any;
}

export const fetchMetar = async (icaoCode: string) : Promise<MetarResponse> => {
  const response = await api.get(`/metar/${icaoCode}`);
  return response.data;
};