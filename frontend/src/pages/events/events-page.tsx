import React, { useState, useEffect } from "react";
import Timeline from "../../components/timeline/timeline";
import PhotosThumbnails from "../../components/photos-thumbnails/photos-thumbnails";
import * as api from "../../api/api";
import "./events-page.css"

export interface Event {
    _id: string,
    category: string,
    title: string,
    date: string,
    description: string,
    location: string,
    selected: boolean,
    photos: any[]
}

export interface YearEvents {
    _id: string,
    category: string,
    title: string,
    date: string,
    selected: boolean,
    isEvent: boolean,
    events: Event[]
}


const EventsPage = () => {
    /*  states declaration */
    // set years full list
    const [yearsEventsList, setYearsEventsList] = useState<YearEvents[]>([]);

    // Get all years without associated events on component mounting
    useEffect(() => {
        const getAllYears = async () => {
            const response = await api.getAllYearsWithoutEvents();
            response.data.forEach((data: any) => {
                data["selected"] = false;
            })
            setYearsEventsList(response.data);
        }
        getAllYears();
    }, []);

    // API call to get events in the selected year
    const getYearEvents = async (date: string) => {
        const response = await api.getEventsByYear(date);
        return response.data;
    };

    // Get events in the selected year and toggle selected flag 
    const handleSelectEvent = async (id: string): Promise<any> => {
        const copyEventsList = [...yearsEventsList];
        const index = yearsEventsList.findIndex(event => event._id === id);

        if (!copyEventsList[index].selected && !copyEventsList[index].events) {
            const events = await getYearEvents(copyEventsList[index].date);

            events.forEach((event: Event) => {
                event["selected"] = false;
            });
            copyEventsList[index].events = events;
        }

        copyEventsList[index].selected = !copyEventsList[index].selected;
        setYearsEventsList(copyEventsList);
    };

    return (
        <div className="main-wrapper">
            <div className="timeline-component">
                {yearsEventsList.length > 0 &&
                    <Timeline yearsEventsList={yearsEventsList} setSelectedEvent={handleSelectEvent}></Timeline>
                }
            </div>
            <div className="photos-thumbnails-component">
                <PhotosThumbnails />
            </div>
        </div>
    )
};

export default EventsPage;