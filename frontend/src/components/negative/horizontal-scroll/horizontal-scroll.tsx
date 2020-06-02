import React, { useState } from "react";
import { YearEvents } from "../../../shared/models";
import "./horizontal-scroll.css";

// horizontal scroll props interface declaration
interface HorizontalScrollProps {
    setNegativeTranslation: any,
    yearsEventsList: YearEvents[]
}

const HorizontalScroll = ({ setNegativeTranslation, yearsEventsList }: HorizontalScrollProps) => {
    /* states declaration */
    // set scroll value
    const [scrollValue, setScrollValue] = useState<string>('0');

    const tickStep = 100 / yearsEventsList.length;
    let tickVal = 0;

    // set scroll value on slider change and send translation to timeline
    const handleScrollChange = (e: any) => {
        const val = e.target.value;
        setNegativeTranslation(parseInt(val));
        setScrollValue(val);
    }

    return (
        <div className="scroll-wrapper">
            <div className="selector-wrapper">
                <input type="range" list="tickmarks" step="0.5" min='0' max="100" value={scrollValue} className="selector" onChange={(e) => handleScrollChange(e)} />
            </div>
            <div>
                <datalist id="tickmarks">
                    {yearsEventsList.map(year => {
                        tickVal = tickVal + tickStep;
                        return (
                            <div key={tickVal} style={{ width: `${tickStep}%` }}>
                                <option value={`${tickVal}`} label={`${year.date}`} />
                            </div>
                        )
                    })}
                </datalist>
            </div>
        </div>
    )
}

export default HorizontalScroll;