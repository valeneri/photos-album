import React, { useState } from "react";
import { YearEvents } from "../../shared/models";
import HorizontalScroll from "./horizontal-scroll/horizontal-scroll";
import "./negative.css";
import YearUI from "./year-ui/year-ui";

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

    // display years list 
    const displayYearsEvents = () => {
        return yearsEventsList.map((yearEvents: YearEvents) => {
            return (
                <div className="years-ui wrapper" key={yearEvents._id}>
                    <div>
                        <YearUI year={yearEvents} setSelectedYear={setSelectedYear} />
                    </div>
                </div>
            )
        })
    }

    const completeTimeline = () => {
        const fakeYearsArray = new Array(8 - yearsEventsList.length);
        const fakeYear = "aaaa"
        fakeYearsArray.fill(fakeYear)
        const negativeUrl = `${process.env.PUBLIC_URL}/year-negative-back/test_negatif3.png`;
        return fakeYearsArray.map((fake, index) => {
            return (
                <div className="years-ui wrapper" key={index}>
                    <div>
                        <div style={{ backgroundImage: `url('${negativeUrl}')` }} className="year"><h5>{fake.fakeYear}</h5></div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <section className="full-years-list wrapper">
                <div className="border top" />
                <div className="full-years wrapper" style={setTranslation()}>
                    {
                        displayYearsEvents()
                    }
                    {
                        yearsEventsList.length < 8 && completeTimeline()
                    }
                </div>
                <HorizontalScroll yearsEventsList={yearsEventsList} setNegativeTranslation={translateEvents} />
            </section>
        </div>
    )
}

export default Negative;