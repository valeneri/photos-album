import React, { useState } from "react";
import "./horizontal-scroll.css";

// horizontal scroll props interface declaration
interface HorizontalScrollProps {
    maxRange: number,
    setNegativeTranslation: any
}

const HorizontalScroll = ({ maxRange, setNegativeTranslation }: HorizontalScrollProps) => {
    /* states declaration */
    // set scroll value
    const [scrollValue, setScrollValue] = useState<string>('0');

    // set scroll value on slider change and send translation to timeline
    const handleScrollChange = (e: any) => {
        const val = e.target.value;
        setNegativeTranslation(parseInt(val));
        setScrollValue(val);
    }

    return (
        <div className="scroll-wrapper">
            <div className="scroll-selector">
                <input type="range" step="1" min='0' max={`${maxRange}`} value={scrollValue} className="selector" onChange={(e) => handleScrollChange(e)} />
            </div>
        </div>
    )
}

export default HorizontalScroll;