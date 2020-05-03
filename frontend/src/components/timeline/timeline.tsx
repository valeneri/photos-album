import React, { useState } from "react";
import { YearEvents } from "../../pages/events/events-page";
import Filters from "./filters/filters";
import HorizontalScroll from "./horizontal-scroll/horizontal-scroll";
import Negative from "./negative/negative";
import "./timeline.css";

// Timeline props interface declaration
interface TimelineProps {
  yearsEventsList: YearEvents[];
  setSelectedEvent: any;
}

const Timeline = ({ yearsEventsList, setSelectedEvent }: TimelineProps) => {
  /*  states declaration */
  // set negative component translation, "0" by default (left)
  const [negativeTranslation, setNegativeTranslation] = useState<string>('0');

  // set translation given horizontal scroll slider's position
  const translateEvents = (val: number) => {
    const scale = -val * 230;
    setNegativeTranslation(`${scale}`);
  }

  // compute horizontal-scroll slider's max range given the length of years(+events) list length
  const maxRange = (): number => {
    let totalLength = yearsEventsList.length;

    yearsEventsList.forEach((year: YearEvents) => {
      if (year.events && year.events.length > 0) {
        if (year.selected) {
          totalLength += year.events.length;
        }
      }
    });
    return totalLength - 6;
  }

  return (
    <div className="timeline">
      <div className="timeline-wrapper">
        <div className="negative-component">
          <Negative yearsEventsList={yearsEventsList} setSelectedEvent={setSelectedEvent} translation={negativeTranslation} />
        </div>
        <div className="selectors">
          <div className="selected-years-component">
            <p>Années sélectionnées :
              {
                yearsEventsList.map((year: YearEvents) => {
                  return year.selected && <span key={year._id}>{year.date} </span>
                })
              }
            </p>
          </div>
          <div className="zoom-component">
            <HorizontalScroll maxRange={maxRange()} setNegativeTranslation={translateEvents} />
          </div>
          <div className="filters-component">
            <Filters />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline;