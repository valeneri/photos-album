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

export interface Photo {
    _id: string,
    name: string,
    title: string,
    path: string,
    date: string
    eventTag: string
}

export interface YearEvents {
    _id: string,
    category: string,
    title: string,
    date: string,
    selected: boolean,
    isEvent: boolean,
    events: Event[],
    photos: Photo[]
}


const EventsPage = () => {
    /*  states declaration */
    // set years full list
    const [yearsEventsList, setYearsEventsList] = useState<YearEvents[]>([]);

    // Get all years without associated events on component mounting
    useEffect(() => {
        const getAllYears = async () => {
            const response = await api.getAllYearsWithoutEvents();
            setYearsEventsList(response.data);
        }
        getAllYears();
    }, []);

    // API call to get events in the selected year
    const getEventsByYearWithPhotos = async (date: string) => {
        const response = await api.getEventsByYearWithPhotos(date);
        return response.data;
    };


    // handle actions on select, base on event category
    const handleSelectEvent = (event: any) => {
        if (event.category === "year") {
            selectYear(event);
        }
        else {
            selectEvent(event);
        }
    };

    // Get events in the selected year and toggle selected flag 
    const selectYear = async (yearEvents: YearEvents): Promise<any> => {
        const index = yearsEventsList.findIndex(event => event._id === yearEvents._id);
        const copyYearsEventsList = [...yearsEventsList];

        if (!yearEvents.events && index != -1) {
            const events = await getEventsByYearWithPhotos(yearEvents.date);
            copyYearsEventsList[index].events = events;
        }

        copyYearsEventsList[index].selected = !copyYearsEventsList[index].selected;
        setYearsEventsList(copyYearsEventsList);
    }

    // toggle selected flag 
    const selectEvent = async (event: Event) => {
        const copyYearsEventsList = [...yearsEventsList];

        copyYearsEventsList.forEach(yearEvents => {
            if (yearEvents.events) {
                const eventIndex = yearEvents.events.findIndex(evt => evt._id === event._id);
                if (eventIndex !== -1) {
                    yearEvents.events[eventIndex] = event;
                }
            }
        })
        setYearsEventsList(copyYearsEventsList);
    }

    return (
        <div className="main-wrapper">
            <div className="timeline-component">
                {
                    yearsEventsList.length > 0 &&
                    <Timeline yearsEventsList={yearsEventsList} setSelectedEvent={handleSelectEvent}></Timeline>
                }
            </div>
            <div className="photos-thumbnails-component">
                {
                    yearsEventsList.map((year: YearEvents) => {
                        if (year.selected) {
                            return (
                                <div className="photos-thumbnails" key={year._id}>
                                    <PhotosThumbnails selectedYear={year} setSelectedEvent={handleSelectEvent} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
};

export default EventsPage;

