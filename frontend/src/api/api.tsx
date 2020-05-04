import axios, { AxiosResponse } from "axios";

// getAllYearsWithoutEvents
export const getAllYearsWithoutEvents = (): Promise<AxiosResponse> => {
    return axios.get('http://localhost:8080/api/years');
}

// getEventsByYear
export const getEventsByYear = (year: string): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:8080/api/events/${year}`)
}

export const getPhotosByYear = (year: string): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:8080/api/photos/${year}`)
}