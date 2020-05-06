import React, { useState, useEffect } from "react";
import { Event, YearEvents } from "../../pages/events/events-page";
import DisplayPhotos from "./display-photos/display-photos";
import * as api from "../../api/api";
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedYear: YearEvents,
    setSelectedEvent: any
}

const PhotosThumbnails = ({ selectedYear, setSelectedEvent }: PhotosThumbnailsProps) => {

    // display selected event photos, or "click me" if no event is selected
    const displayPhotos = (events: Event[]) => {
        const selectedEvents = events.filter((event: Event) => event.selected);

        if (selectedEvents.length > 0) {
            return selectedEvents.map((event: Event) => {
                if (event.selected && event.photos.length > 0) {
                    return (<DisplayPhotos selectedEvent={event} key={event._id} />)
                }
            })
        } else {
            return (<h3>Cliquez sur un onglet pour afficher les photos !</h3>)
        }
    }

    const handleSelectedEvent = (event: Event) => {
        event.selected = !event.selected;
        setSelectedEvent(event);
    }

    return (
        <div className="full-year-wrapper">
            <div className="year-tab">
                <div className="year-details">
                    <h2>{selectedYear.date}</h2>
                </div>
                <div className="events-tab-wrapper">
                    <div className="event-tab-details">
                        <h5>Afficher tous</h5>
                    </div>
                    {selectedYear.events && selectedYear.events.map(event => {
                        return (
                            <div key={`${event._id}`} className="event-tab-details" onClick={() => handleSelectedEvent(event)}>
                                <small>{event.title}</small>
                                <p>
                                    <small>{event.full_date}</small><br />
                                    <small>{event.photosNumber} photos</small>
                                </p>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            {
                <div className="thumbnails-wrapper">
                    {
                        displayPhotos(selectedYear.events)
                    }
                </div>
            }
        </div>
    )
}
export default PhotosThumbnails;