import React from "react";
import { YearEvents } from "../../pages/events/events-page";
import Filters from "./filters/filters";
import Negative from "./negative/negative";
import "./timeline.css";

// Timeline props interface declaration
interface TimelineProps {
  yearsEventsList: YearEvents[];
  setSelectedEvent: any;
  setSelectedCategory: any;
  categories: any[]
}

const Timeline = ({ yearsEventsList, setSelectedEvent, setSelectedCategory, categories }: TimelineProps) => {

  const selectedYears = yearsEventsList.filter(year => { return year.selected });

  return (
    <div className="timeline">
      <div className="timeline-wrapper">
        <div className="negative-component">
          <Negative yearsEventsList={yearsEventsList} setSelectedEvent={setSelectedEvent} />
        </div>
        <div className="selectors">
          <div className="filters-component">
            {selectedYears.length > 0 &&
              <Filters categories={categories} setSelectedCategory={setSelectedCategory} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline;