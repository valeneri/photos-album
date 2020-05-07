import axios, { AxiosResponse } from "axios";
import { YearEvents, Event, Photo } from "../pages/events/events-page";

// get all years withtout the associated events
export const getAllYearsWithoutEvents = (): Promise<AxiosResponse<YearEvents[]>> => {
    return axios.get('http://localhost:8080/api/years');
}

export const getAllYearsEvents = (): Promise<AxiosResponse<YearEvents[]>> => {
    return axios.get('http://localhost:8080/api/years/events');
}


// get all events of selected year
export const getEventsByYear = (year: string): Promise<AxiosResponse<Event[]>> => {
    return axios.get(`http://localhost:8080/api/events/${year}`)
}

// get all photos of selected year
// export const getPhotosByYear = (year: string): Promise<AxiosResponse> => {
//     return axios.get(`http://localhost:8080/api/photos/${year}`)
// }

// get all photos of selected event
export const getPhotosByEvent = (tag: string): Promise<AxiosResponse<Photo[]>> => {
    return axios.get(`http://localhost:8080/api/photos/event/${tag}`)
}

export const createEvent = (event: Event): Promise<AxiosResponse<Event>> => {
    const data = { newEvent: event };
    return axios.post(`http://localhost:8080/api/events`, data)
}

export const createYear = (date: any) => {
    const data = {
        year: {
            date: date
        }
    }
    console.log(data)
    return axios.post(`http://localhost:8080/api/years`, data);
}