import React from "react";
import { YearEvents } from "../../pages/events/events-page";
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
      </div>
    </div>
  )
}

export default Timeline;