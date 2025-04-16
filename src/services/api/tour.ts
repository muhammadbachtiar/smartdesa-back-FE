import axios from 'axios';
import HandleRespondResponse from '../utils/handleRespondResponse';
import { TourData } from '../../types/tourManagement.type';
import { TourForm } from '../../types/tour.type';
import HandleRespondError from '../utils/handleRespondError';
import { ResponseCreateDataType } from '../../types/response.type';

const BASE_API = import.meta.env.VITE_API_AUTH_URL
const token = localStorage.getItem('token');

export const fetchTourData = async (page: number, search: string = '') => {
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      HandleRespondError(error);
    } else {
        console.error('Unexpected error type:', error);
    }
    throw error;
  }
};

export const createTourData = async (data: TourForm | null) => {
  try {
    const response : ResponseCreateDataType<{ data: TourData; }, { data: {message: string; data: string[]}}> = await axios.post(`${BASE_API}/api/v1/tour`,
      data,
      {
        timeout: 15000,
        headers: {
            'ngrok-skip-browser-warning': true,
            'Authorization': `Bearer ${token}`
        }
      }
    );  
    HandleRespondResponse<TourData>(response, "created")
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      HandleRespondError(error);
    } else {
        console.error('Unexpected error type:', error);
    }
    throw error;
  }
};


export const deleteTourData = async (id: number) => {
  try {
    const response : ResponseCreateDataType<{ data: TourData; }, { data: {message: string; data: string[]}}> = await axios.delete(`${BASE_API}/api/v1/tour/${id}`,
      {
        timeout: 15000,
        headers: {
            'ngrok-skip-browser-warning': true,
            'Authorization': `Bearer ${token}`
        }
      }
    );
    HandleRespondResponse<TourData>(response, 'deleted');
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      HandleRespondError(error);
    } else {
        console.error('Unexpected error type:', error);
    }
    throw error;
  }
};
