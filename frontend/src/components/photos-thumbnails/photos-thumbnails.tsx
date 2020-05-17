import React, { useState, useEffect } from "react";
import { Event, YearEvents } from "../../pages/events/events-page";
import DisplayPhotos from "./display-photos/display-photos";
import * as api from "../../api/api";
import { textDate } from '../../utils/utils';
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedYear: YearEvents,
    setSelectedEvent: any
}

const PhotosThumbnails = ({ selectedYear, setSelectedEvent }: PhotosThumbnailsProps) => {

    // set selected events order
    const [showOrderedEvents, setShowOrderedEvents] = useState<Event[]>([]);


    // display selected event photos, or "click me" if no event is selected
    const displayPhotos = (event: Event) => {
        return (<div key={event._id} style={{ display: (event.selected ? 'block' : 'none') }}>
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
        setEventsOrder(event);
        setSelectedEvent(event);
    }

    /* set display events order.
        if selected event already in events list, remove it then push it at first position
        else if selected event not in list, push it directly at first position
        else events list is empty, just push it 
    */
    const setEventsOrder = (event: Event) => {
        let copyEvents;
        showOrderedEvents.length > 0 ? copyEvents = [...showOrderedEvents] : copyEvents = showOrderedEvents;

        const isAlreadyIn = copyEvents.findIndex((elem: Event) => { return elem._id === event._id });

        if (copyEvents.length > 0 && event.selected && isAlreadyIn !== -1) {
            copyEvents = copyEvents.filter((elem: Event) => { return elem._id !== event._id });
            copyEvents.unshift(event);
        } else if (copyEvents.length > 0 && event.selected && isAlreadyIn === -1) {
            copyEvents.unshift(event);
        } else if (copyEvents.length === 0) {
            copyEvents.push(event);
        }
        setShowOrderedEvents(copyEvents);
    }

    return (
        <div className="full-year-wrapper">
            <div className="year-details">
                <h2>Année {selectedYear.date}</h2>
            </div>
            <div className="year-tab">

                <div className="events-tab-wrapper">
                    <div className="event-tab-details display-all">
                        <h5>Afficher tous</h5>
                    </div>
                    {selectedYear.events && selectedYear.events.map(event => {
                        return (
                            <div key={`${event._id}`} className={`event-tab-details ${event.selected ? "selected" : null}`} onClick={() => handleSelectedEvent(event)}>

                                {/* <p> */}
                                <span className="title">{event.title}</span>
                                <br />
                                <span>
                                    {textDate(event.full_date)}
                                    {/* </br> */}
                                    <small> ({event.photosNumber} photos)</small>
                                </span>

                                {/* </p> */}
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            {
                <div className="thumbnails-wrapper">
                    {
                        showOrderedEvents.filter(evt => { return evt.selected }).length > 0 ?
                            showOrderedEvents.map((event: Event) => {
                                if (event.photos) {
                                    return displayPhotos(event)
                                }
                            })
                            : <h3>Cliquez sur un évènement pour afficher les photos</h3>
                    }
                </div>
            }
        </div>
    )
}
export default PhotosThumbnails;