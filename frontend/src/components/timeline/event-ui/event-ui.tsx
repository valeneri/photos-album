import React from "react";
import "./event-ui.css";
import { YearEvents } from "../../../pages/events/events-page";

// EventUi props interface declaration
interface EventUIProps {
    event: any;
    setSelectedEvent: any;
    className: string;
}

const EventUI = ({ event, setSelectedEvent, className }: EventUIProps) => {

    // set class (event or year) and toggle class if event is selected
    const setClass = (className: string) => {
        let clazz = `${className} base`;

        if (event.selected) {
            clazz = clazz + ' selected';
        }
        return clazz;
    }

    return (
        <div className={setClass(className)} onClick={() => setSelectedEvent(event)} >
            {/* <h5>{event.title}</h5> */}
            <h5>{event.date}</h5>
            <p>
                <span>{event.eventsNumber} évènements</span>
            </p>
        </div>
    )
}

export default EventUI;