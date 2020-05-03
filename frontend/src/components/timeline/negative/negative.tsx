import React from "react";
import { YearEvents, Event } from "../../../pages/events/events-page";
import EventUI from "./event-ui/event-ui";
import "./negative.css";

// Negative props interface declaration
interface NegativeProps {
    yearsEventsList: YearEvents[],
    setSelectedEvent: any,
    translation: string
}

const Negative = ({ yearsEventsList, setSelectedEvent, translation }: NegativeProps) => {

    // set events translation
    const setTranslation = () => {
        return { transform: `translate(${translation}px)` };
    }

    // display years list as events with "real events" next when year is selected
    const displayYearsEvents = () => yearsEventsList.map((yearEvents: YearEvents) => {
        if (yearEvents.selected && yearEvents.events) {
            return (
                <div className="years-events-wrapper" key={yearEvents._id}>
                    <div>
                        <EventUI className="year" event={yearEvents} setSelectedEvent={setSelectedEvent} />
                    </div>
                    {yearEvents.events.map((event: Event) => {
                        return (
                            <div key={`${yearEvents._id}-${event._id}`}>
                                <EventUI event={event} className="event" setSelectedEvent={setSelectedEvent} />
                            </div>
                        )
                    })
                    }
                </div>
            )
        } else {
            return (
                <div className="years-events-wrapper" key={yearEvents._id}>
                    <div>
                        <EventUI className="year" event={yearEvents} setSelectedEvent={setSelectedEvent} />
                    </div>
                </div>
            )
        }
    })

    return (
        <div>
            <section className="events-list-wrapper">
                <div className="border top" />
                <div className="full-events-wrapper" style={setTranslation()}>
                    {
                        displayYearsEvents()
                    }
                </div>
                <div className="border bottom" />
            </section>

        </div>
    )
}

export default Negative;