import React, { useState, useEffect } from "react";
import { YearEvents, Event } from "../../../pages/events/events-page";
import EventUI from "../event-ui/event-ui";
import "./negative.css";
import HorizontalScroll from "../horizontal-scroll/horizontal-scroll";

// Negative props interface declaration
interface NegativeProps {
    yearsEventsList: YearEvents[],
    setSelectedEvent: any,
    // translation: string,
    // setNegativeTranslation: any
}

const Negative = ({ yearsEventsList, setSelectedEvent }: NegativeProps) => {
    /*  states declaration */
    // set negative component translation, "0" by default (left)
    const [negativeTranslation, setNegativeTranslation] = useState<string>('0');

    // set events translation
    const setTranslation = () => {
        return { transform: `translate(${negativeTranslation}px)` };
    }

    // set translation given horizontal scroll slider's position
    const translateEvents = (val: number) => {
        const eventsLength = getTotalEventsLength();
        const step = 100 / yearsEventsList.length;

        const scale = -((val * 244) / step + (eventsLength * 180));
        setNegativeTranslation(`${scale}`);
    }

    // compute horizontal-scroll slider's max range given the length of years(+events) list length
    const getTotalEventsLength = (): number => {
        let eventsLength = 0;

        yearsEventsList.forEach((year: YearEvents) => {
            if (year.events && year.events.length > 0) {
                if (year.selected) {
                    eventsLength = eventsLength + year.events.length;
                }
            }
        });
        return eventsLength;
    }

    // display years list as events with "real events" next when year is selected
    const displayYearsEvents = () => yearsEventsList.map((yearEvents: YearEvents) => {
        if (yearEvents.selected && yearEvents.events && yearEvents.events.length > 0) {
            return (
                <div className="years-list wrapper" key={yearEvents._id}>
                    <div>
                        <EventUI className="year" event={yearEvents} setSelectedEvent={setSelectedEvent} />
                    </div>
                    {/* <div style={{ borderTop: `7px solid red`, borderBottom: `7px solid red`, borderRight: `7px solid red` }}> */}
                    <div className="full-events-list wrapper">
                        <div className="border-event top" />
                        <div className="events-list wrapper">
                            {yearEvents.events.map((event: Event) => {
                                return (
                                    <div key={`${yearEvents._id}-${event._id}`}>
                                        <EventUI event={event} className="event" setSelectedEvent={setSelectedEvent} />
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className="border-event bottom" />
                    </div>
                    <div style={{ borderRight: `7px solid white` }}></div>
                </div >
            )
        } else {
            return (
                <div className="years-events wrapper" key={yearEvents._id}>
                    <div>
                        <EventUI className="year" event={yearEvents} setSelectedEvent={setSelectedEvent} />
                        <div style={{ borderRight: `2px solid white` }}></div>
                    </div>
                </div>
            )
        }
    })

    return (
        <div>
            <section className="full-years-list wrapper">
                <div className="border top" />
                <div className="full-years wrapper" style={setTranslation()}>
                    {
                        displayYearsEvents()
                    }
                </div>
                {/* <div className="border bottom" /> */}
                <HorizontalScroll yearsEventsList={yearsEventsList} setNegativeTranslation={translateEvents} />
            </section>

        </div>
    )
}

export default Negative;