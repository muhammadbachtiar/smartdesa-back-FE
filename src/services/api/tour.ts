import axios from 'axios';
import HandleRespondResponse from '../utils/handleRespondResponse';
import { TourData } from '../../types/tourManagement.type';

const BASE_API = import.meta.env.VITE_API_AUTH_URL
const token = localStorage.getItem('token');

export const fetchTourData = async (page: number, search: string = '') => {
  const response = await axios.get(`${BASE_API}/api/v1/tour?search=${search || ''}&page=${page}&page_size=10`,
    {
      timeout: 15000,
      headers: {
          'ngrok-skip-browser-warning': true,
          'Authorization': `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteTourData = async (id: number) => {
  const response = await axios.delete(`${BASE_API}/api/v1/tour/${id}`,
    {
      timeout: 15000,
      headers: {
          'ngrok-skip-browser-warning': true,
          'Authorization': `Bearer ${token}`
      }
    }
  );
  HandleRespondResponse<TourData>(response.data, 'deleted');
  return response.data;
};
