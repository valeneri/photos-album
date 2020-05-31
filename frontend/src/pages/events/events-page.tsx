import React, { useEffect, useState } from "react";
import * as api from "../../api/api";
import PhotosThumbnails from "../../components/photos-thumbnails/photos-thumbnails";
import Timeline from "../../components/timeline/timeline";
import { sortByDateAsc } from '../../utils/utils';
import "./events-page.css";
import { usePhotosModal } from "../../hooks/use-photos-modal";

export interface Event {
    _id: string,
    category: string,
    title: string,
    date: string,
    full_date: string,
    description: string,
    location: string,
    selected: boolean,
    photosNumber: number,
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
    eventsNumber: number,
    events: Event[],
    photos: Photo[],
}

export interface Category {
    value: number,
    label: string,
    name: string,
    selected: boolean
}

const EventsPage = () => {

    /*  states declaration */
    // set years events full list
    const [yearsEventsList, setYearsEventsList] = useState<YearEvents[]>([]);
    // set selected thumbnails photo index
    const [startIndex, setStartIndex] = useState<number>(-1);
    // set selected thumbnails event
    const [displayedEvent, setDisplayedEvent] = useState<Event>();
    // photo modal hook
    const { show, RenderPhotosModal } = usePhotosModal();

    // Get all years without associated events on component mounting
    useEffect(() => {
        const getAllYears = async () => {
            const response = await api.getAllYearsWithoutEvents();
            setYearsEventsList(response.data);
        }
        getAllYears();
    }, []);

    // handle actions on select, base on event category
    const handleSelectEvent = (event: any) => {
        event.category === "year" ? selectYear(event) : selectEvent(event);
    };

    // Get events in the selected year, toggle selected flag then count events categories & filter
    const selectYear = async (yearEvents: YearEvents) => {
        const index = yearsEventsList.findIndex(year => year._id === yearEvents._id);
        const copyYearsEventsList = [...yearsEventsList];

        if (!yearEvents.events && index != -1) {
            const response = await api.getEventsByYear(yearEvents.date);
            copyYearsEventsList[index]["events"] = response.data;

            sortByDateAsc(copyYearsEventsList[index].events);
        }
        copyYearsEventsList[index].selected = !copyYearsEventsList[index].selected;
        setYearsEventsList(copyYearsEventsList);
    }

    // Get event's photos and toggle selected flag 
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

    // pass event photos and selected photo index on modal when selecting photo
    const handleSelectedPhoto = (photo: Photo, event: Event) => {
        if (event && event.photos.length > 0) {
            const index = event.photos.findIndex((elem: Photo) => elem._id === photo._id);
            if (index !== -1) {
                setStartIndex(index);
                setDisplayedEvent(event);
                show();
            }
        }
    }

    return (
        <div className="main-wrapper">
            <div className="timeline-component">
                {
                    yearsEventsList.length > 0 &&
                    <Timeline yearsEventsList={yearsEventsList}
                        setSelectedEvent={handleSelectEvent}
                    />
                }
            </div>
            <div className="photos-thumbnails-component">
                {
                    yearsEventsList.map((year: YearEvents) => {
                        if (year.selected && year.events.length > 0) {
                            return (
                                <div className="photos-thumbnails" key={year._id}>
                                    <PhotosThumbnails
                                        selectedYear={year}
                                        setSelectedEvent={handleSelectEvent}
                                        setSelectedPhoto={handleSelectedPhoto}
                                    />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="photos-viewer">
                {
                    displayedEvent &&
                    startIndex >= 0 &&
                    <RenderPhotosModal photos={displayedEvent.photos} index={startIndex} />
                }
                <div id="modal-root" />
            </div>
        </div>
    )
};

export default EventsPage;

