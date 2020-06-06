import React, { useState, useEffect } from "react";
import "./year-ui.css";
import { YearEvents } from "../../../shared/models";
import negativeUrl from './negatives-background/test_negatif3.png';
import negativeUrl1 from './negatives-background/random_year_back.png';
import negativeUrl2 from './negatives-background/random_year_back2.png';

// EventUi props interface declaration
interface YearUIProps {
    year: YearEvents;
    setSelectedYear: any;
}


const YearUI = ({ year, setSelectedYear }: YearUIProps) => {

    // selected state (for UI)
    const [selected, setSelected] = useState<string>('');
    // bakground url
    const [background, setBackground] = useState<string>('');

    useEffect(() => {
        const randomBackground = () => {
            const negativesBackArray = [negativeUrl, negativeUrl1, negativeUrl2];
            const pos = Math.floor(Math.random() * Math.floor(negativesBackArray.length));
            setBackground(negativesBackArray[pos]);
        }
        randomBackground();
    }, [])

    const handleSelectYear = (year: YearEvents) => {
        selected === '' ? setSelected('selected') : setSelected('');
        setSelectedYear(year);
    }

    return (
        <div style={{ backgroundImage: `url('${background}')` }} className={`year ${selected}`} onClick={() => handleSelectYear(year)} >
            < h5 > {year.date}</h5 >
            <p>
                <span>{year.eventsNumber} évènements</span>
            </p>
        </div >
    )
}

export default YearUI;