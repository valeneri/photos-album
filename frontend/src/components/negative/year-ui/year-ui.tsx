import React from "react";
import "./year-ui.css";
import { YearEvents } from "../../../pages/events/events-page";

// EventUi props interface declaration
interface EventUIProps {
    year: YearEvents;
    setSelectedYear: any;
}

const YearUI = ({ year, setSelectedYear }: EventUIProps) => {

    // set class (event or year) and toggle class if event is selected
    const setClass = () => {
        let className = 'year';

        if (year.selected) {
            className = className + ' selected';
        }
        return className;
    }

    return (
        <div className={setClass()} onClick={() => setSelectedYear(year)} >
            <h5>{year.date}</h5>
            <p>
                <span>{year.eventsNumber} évènements</span>
            </p>
        </div>
    )
}

export default YearUI;