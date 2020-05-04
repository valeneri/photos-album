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
            // response.data.forEach((data: any) => {
            //     data["selected"] = false;
            // })
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
    const selectYear = async (yearEvents: YearEvents): Promise<any> => {
        const index = yearsEventsList.findIndex(event => event._id === yearEvents._id);
        const copyEventsList = [...yearsEventsList];

        if (!yearEvents.events && index != -1) {
            const events = await getYearEvents(yearEvents.date);
            copyEventsList[index].events = events;
        }

        copyEventsList[index].selected = !copyEventsList[index].selected;
        setYearsEventsList(copyEventsList);
    }

    // Toggle selected flag for event
    const selectEvent = async (event: Event) => {
        const copyEventsList = [...yearsEventsList];

        copyEventsList.forEach(yearEvents => {
            if (yearEvents.events) {
                const eventIndex = yearEvents.events.findIndex(evt => evt._id === event._id);
                if (eventIndex !== -1) {
                    yearEvents.events[eventIndex].selected = !yearEvents.events[eventIndex].selected;
                }
            }
        })
        setYearsEventsList(copyEventsList);
    }

    // handle actions on select, base on event category
    const handleSelectEvent = (event: any) => {
        if (event.category === "year") {
            selectYear(event);
        } else {
            selectEvent(event);
        }
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