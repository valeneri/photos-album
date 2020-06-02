import React, { useEffect, useState } from "react";
import * as api from "../../shared/api";
import PhotosThumbnails from "../../components/photos-thumbnails/photos-thumbnails";
import Negative from "../../components/negative/negative";
import { usePhotosModal } from "../../shared/hooks/use-photos-modal";
import { sortEventsByDateAsc } from '../../shared/utils';
import "./events-page.css";
import { YearEvents, Event, Photo } from "../../shared/models";

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
            // const sortedYears = sortYearsByDateDesc(response.data);
            setYearsEventsList(response.data);
        }
        getAllYears();
    }, []);

    // Get events in the selected year, toggle selected flag then count events categories & filter
    const handleSelectYear = async (yearEvents: YearEvents) => {
        const index = yearsEventsList.findIndex(year => year._id === yearEvents._id);
        const copyYearsEventsList = [...yearsEventsList];

        if (!yearEvents.events && index != -1) {
            const response = await api.getEventsByYear(yearEvents.date);
            copyYearsEventsList[index]["events"] = response.data;

            sortEventsByDateAsc(copyYearsEventsList[index].events);
        }
        copyYearsEventsList[index].selected = !copyYearsEventsList[index].selected;
        setYearsEventsList(copyYearsEventsList);
    }

    // Get event's photos and toggle selected flag 
    const handleSelectEvent = async (event: Event) => {
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
    const handleSelectPhoto = (photo: Photo, event: Event) => {
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
                    <Negative yearsEventsList={yearsEventsList} setSelectedYear={handleSelectYear} />
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
                                        setSelectedPhoto={handleSelectPhoto}
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

