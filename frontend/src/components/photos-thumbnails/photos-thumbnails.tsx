import React from "react";
import { Event, YearEvents } from "../../pages/events/events-page";
import DisplayPhotos from "./display-photos/display-photos";
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedEvents: YearEvents[],
    setSelectedEvent: any
}

const PhotosThumbnails = ({ selectedEvents, setSelectedEvent }: PhotosThumbnailsProps) => {

    // display selected event photos, or "click me" if no event is selected
    const displayPhotos = (year: YearEvents) => {
        const selectedEvents = year.events.filter((event: Event) => event.selected)
        if (selectedEvents.length > 0) {
            return (selectedEvents.map((event: Event) => {
                if (event.photos) {
                    return (<DisplayPhotos selectedEvent={event} key={event._id} />)
                }
            }))
        } else {
            return (<h3>Cliquez sur un onglet pour afficher les photos !</h3>)
        }
    }

    return (
        <div className="photos-thumbnails">
            {selectedEvents && selectedEvents.map((year: YearEvents) => {
                return (
                    <div key={year._id} className="full-year-wrapper">
                        <div className="year-tab">
                            <div className="year-details">
                                <h2>{year.date}</h2>
                            </div>
                            <div className="events-tab-wrapper">
                                <div className="event-tab-details">
                                    <h5>Afficher tous</h5>
                                </div>
                                {year.events && year.events.map(event => {
                                    return (
                                        <div key={`${event._id}`} className="event-tab-details" onClick={() => setSelectedEvent(event)}>
                                            <h5>{event.title}</h5>
                                            <p>
                                                <span>{event.date}</span>
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
                                    displayPhotos(year)
                                }
                            </div>
                        }
                    </div>
                )
            })
            }
        </div>
    )
}
export default PhotosThumbnails;