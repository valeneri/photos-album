import axios, { AxiosResponse } from "axios";

// get all years withtout the associated events
export const getAllYearsWithoutEvents = (): Promise<AxiosResponse> => {
    return axios.get('http://localhost:8080/api/years');
}

// get all events of selected year
export const getEventsByYear = (year: string): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:8080/api/events/${year}`)
}

// get all photos of selected year
export const getPhotosByYear = (year: string): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:8080/api/photos/${year}`)
}

// get all photos of selected event
export const getPhotosByEventName = (name: string, date: string): Promise<AxiosResponse> => {
    return axios.get(`http://localhost:8080/api/photos/event/${name}/${date}`)
}