import axios, { AxiosResponse } from "axios";
import { YearEvents, Event, Photo, Category } from "./models";

// get all years withtout the associated events (with events number however)
export const getAllYearsWithoutEvents = (): Promise<AxiosResponse<YearEvents[]>> => {
    return axios.get('http://localhost:8080/api/years');
}

// get all years with assoaciated events
export const getAllYearsEvents = (): Promise<AxiosResponse<YearEvents[]>> => {
    return axios.get('http://localhost:8080/api/years/events');
}

// get all events of selected year
export const getEventsByYear = (year: string): Promise<AxiosResponse<Event[]>> => {
    return axios.get(`http://localhost:8080/api/events/${year}`)
}

// get all photos of selected event
export const getPhotosByEventTag = (eventTag: string): Promise<AxiosResponse<Photo[]>> => {
    return axios.get(`http://localhost:8080/api/photos/events/${eventTag}`)
}

// create a new event
export const createEvent = (event: any): Promise<AxiosResponse<Event>> => {
    const data = { event: event };
    return axios.post(`http://localhost:8080/api/events`, data)
}

// save a list of photos
export const savePhotosEvent = (photos: any): Promise<AxiosResponse<Photo[]>> => {
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    const formData = new FormData();

    formData.append('title', photos.title);
    formData.append('date', photos.date);
    formData.append('eventTag', photos.eventTag);

    for (let i = 0; i < photos.files.length; i++) {
        formData.append('photos', photos.files[i]);
    }

    return axios.post(`http://localhost:8080/api/photos/events`, formData, config)
}

// export const createEventWithPhotos = (event: Event): Promise<AxiosResponse<Photo[]>> => {
//     const data = { newEventWithPhotos: event };
//     return axios.post(`http://localhost:8080/api/events/photos`, data);
// }




// create a new year
export const createYear = (year: any) => {
    const data = { year: year };
    return axios.post(`http://localhost:8080/api/years`, data);
}

// get all categories
export const getAllCategories = (): Promise<AxiosResponse<Category[]>> => {
    return axios.get(`http://localhost:8080/api/categories`);
}