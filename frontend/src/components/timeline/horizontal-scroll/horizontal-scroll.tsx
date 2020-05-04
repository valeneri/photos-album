import React, { useState, useRef } from "react";
import "./horizontal-scroll.css";
import { YearEvents } from "../../../pages/events/events-page";
// import { useContainerWidth } from "../../../utils/custom-hooks";

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

    // const sliderRef = useRef()
    // const width = useContainerWidth(sliderRef)
    // set scroll value on slider change and send translation to timeline
    const handleScrollChange = (e: any) => {
        const val = e.target.value;
        setNegativeTranslation(parseInt(val));
        setScrollValue(val);
    }

    // const generateDataList = () => {
    //     const tickStep = 100/yearsEventsList.length;
    //     let tickVal = 0;

    //     const datalist = <datalist id="tickmarks"></datalist>


    //     const optionList = yearsEventsList.map(year => {
    //         tickVal = tickVal + tickStep;
    //         return {value: `${tickVal}`, label:`${year.date}`}
    //     })
    //     return(
    //         <datalist id="tickmarks">

    //         </datalist>
    //     )
    //     const optionList = yearsEventsList.map(year => {
    //          tickVal = tickVal + tickStep;
    //         return (<option value=`${tickVal}` label=`${year.date}`/>)
    //     });
    //     return optionList;
    // }

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