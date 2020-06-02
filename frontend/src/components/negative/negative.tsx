import React, { useState } from "react";
import { YearEvents } from "../../shared/models";
import YearUI from "./year-ui/year-ui";
import HorizontalScroll from "./horizontal-scroll/horizontal-scroll";
import "./negative.css";

// Negative props interface declaration
interface NegativeProps {
    yearsEventsList: YearEvents[];
    setSelectedYear: any;
}

const Negative = ({ yearsEventsList, setSelectedYear }: NegativeProps) => {
    /*  states declaration */
    // set negative component translation, "0" by default (left)
    const [negativeTranslation, setNegativeTranslation] = useState<string>('0');

    // set events translation
    const setTranslation = () => {
        return { transform: `translate(${negativeTranslation}px)` };
    }

    // set translation given horizontal scroll slider's position
    const translateEvents = (val: number) => {
        const step = 100 / yearsEventsList.length;
        const scale = -((val * 244) / step);
        setNegativeTranslation(`${scale}`);
    }

    // display years list as events with "real events" next when year is selected
    const displayYearsEvents = () => yearsEventsList.map((yearEvents: YearEvents) => {
        return (
            <div className="years-events wrapper" key={yearEvents._id}>
                <div>
                    <YearUI year={yearEvents} setSelectedYear={setSelectedYear} />
                    <div style={{ borderRight: `2px solid white` }}></div>
                </div>
            </div>
        )
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
                <HorizontalScroll yearsEventsList={yearsEventsList} setNegativeTranslation={translateEvents} />
            </section>
        </div>
    )
}

export default Negative;