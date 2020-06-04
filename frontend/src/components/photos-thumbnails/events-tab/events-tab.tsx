import React from "react";
import { Event } from "../../../shared/models";
import { textDate } from '../../../shared/utils';
import './events-tab.css';

// EventsTabs Props interface declaration
interface EventsTabProps {
    events: Event[];
    setSelectedEvent: any;
}

const EventsTab = ({ events, setSelectedEvent }: EventsTabProps) => {

    return (
        <div className="events-tab-wrapper">
            {
                events.map((event: Event) => {
                    return (
                        <div key={`${event._id}`} className={`event-tab-details ${event.selected ? 'selected' : null}`} onClick={() => setSelectedEvent(event)}>
                            <span className="title"><b>{event.title}</b></span>
                            <span>
                                {textDate(event.full_date)}
                                <small> ({event.photosNumber} photos)</small>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default EventsTab;