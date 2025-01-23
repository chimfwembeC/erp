import { ProgressBar } from "primereact/progressbar";
import React, { useState } from "react";
// import "./StackedCardScroll.css";

const StackedCardScroll = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        const cardHeight = window.innerHeight; // Each section is full screen height
        const newActiveIndex = Math.round(scrollTop / cardHeight);
        setActiveIndex(newActiveIndex);
    };

    return (
        <div className="relative">
            <div className="absolute z-50 right bottom-center bg-red-500">
                <div className="relative w-full">
                    <div className="absolute top-4 left-4  h-4 w-4 bg-red-500 rounded-full"></div>
                    <div className="absolute border border-red-200 w-full"></div>
                </div>
            </div>
            <div className="stacked-card-container" onScroll={handleScroll}>
                <div className="">

                    {React.Children.map(children, (child, index) => (
                        <div
                            className={`card ${index === activeIndex ? "active" : ""} ${index === activeIndex + 1 ? "next" : ""
                                }`}
                        >
                            {child}
                        </div>
                    ))}



                </div>

            </div>
        </div>
    );
};

export default StackedCardScroll;
