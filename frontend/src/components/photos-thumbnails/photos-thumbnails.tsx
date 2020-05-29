import React, { useState, useEffect } from "react";
import { Event, YearEvents, Category } from "../../pages/events/events-page";
import DisplayPhotos from "./display-photos/display-photos";
import * as api from "../../api/api";
import { textDate } from '../../utils/utils';
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedYear: YearEvents,
    setSelectedEvent: any,
    categories: Category[]
}

const PhotosThumbnails = ({ selectedYear, setSelectedEvent, categories }: PhotosThumbnailsProps) => {
    const [orderedEvents, setOrderedEvents] = useState<Event[]>(selectedYear.events);

    // display selected event photos, or "click me" if no event is selected
    const displayPhotos = (event: Event, isShowed: boolean) => {
        return (<div key={event._id} style={{ display: (isShowed && event.selected ? 'block' : 'none') }}>
            <DisplayPhotos selectedEvent={event} />
        </div>)
    }

    // get selected event photos if there aren't any already, then toggle selected flag
    const handleSelectedEvent = async (event: Event) => {

        if (!event.photos) {
            const tag = `${event.title}_${event.full_date}`;
            const response = await api.getPhotosByEvent(tag);
            event["photos"] = response.data;
        }
        event.selected = !event.selected;

        setSelectedEvent(event);
        setEventsOrder(event);
    }

    /* set display events order.
        if selected event already in events list, remove it then push it at first position
        else if selected event not in list, push it directly at first position
        else events list is empty, just push it 
    */
    const setEventsOrder = (event: Event) => {
        let copyEvents = [...orderedEvents];
        copyEvents = copyEvents.filter((evt: Event) => evt._id !== event._id);
        copyEvents.unshift(event);
        setOrderedEvents(copyEvents);
    }

    const checkEvents = () => {
        const selectedCategories = categories.filter(cat => cat.selected);
        const events = selectedYear.events.filter((event: Event) => {
            if (selectedCategories.find((category: Category) => category.name === event.category)) {
                return event;
            }
        })
        return events.length > 0 ? true : false;
    }

    const displayEventsTab = () => {
        const selectedCategories = categories.filter((category: Category) => category.selected);

        const events: Event[] = selectedYear.events;
        return events.map((event: Event) => {
            if (selectedCategories.find((category: Category) => category.name === event.category)) {
                return (
                    <div key={`${event._id}`} className={`event-tab-details ${event.selected ? "selected" : null}`} onClick={() => handleSelectedEvent(event)}>
                        <span className="title">{event.title}</span>
                        <br />
                        <span>
                            {textDate(event.full_date)}
                            <small> ({event.photosNumber} photos)</small>
                        </span>
                    </div>
                )
            }
        })
    }


    return (
        <div className="full-year-wrapper">
            <div className="year-details">
                <h2>Année {selectedYear.date}</h2>
            </div>
            {
                checkEvents() ?
                    <div>
                        <div className="year-tab">
                            <div className="events-tab-wrapper">
                                {displayEventsTab()}
                            </div>
                        </div>
                        <div className="thumbnails-wrapper">
                            {
                                orderedEvents.filter(evt => { return evt.selected }).length > 0 ?
                                    orderedEvents.map((event: Event) => {
                                        let isShowed: boolean;
                                        categories.filter((category: Category) => category.selected).find((category: Category) => category.name === event.category) ?
                                            isShowed = true :
                                            isShowed = false;

                                        if (event.photos) {
                                            return displayPhotos(event, isShowed)
                                        }
                                    })
                                    : <h3>Cliquez sur un évènement pour afficher les photos</h3>
                            }
                        </div>
                    </div> :
                    <div>
                        <h3>Aucun évènement</h3>
                    </div>
            }
        </div>
    )
}
export default PhotosThumbnails;