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


  return (
    <div className="timeline">
      <div className="timeline-wrapper">
        <div className="negative-component">
          <Negative yearsEventsList={yearsEventsList} setSelectedEvent={setSelectedEvent} />
        </div>
        {/* <div className="selectors">
          <div className="selected-years-component">
            <p>Sélection :
              {
                yearsEventsList.map((year: YearEvents) => {
                  return year.selected && <span key={year._id}>{year.date} </span>
                })
              }
            </p>
          </div>
          <div className="zoom-component">
            {/* <HorizontalScroll maxRange={maxRange()} setNegativeTranslation={translateEvents} /> 
          </div>
          <div className="filters-component">
            <Filters />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Timeline;