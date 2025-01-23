import { ProgressBar } from "primereact/progressbar";
import React, { useState } from "react";

const StackedCardScroll = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const totalCards = React.Children.count(children);

    const handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        const cardHeight = window.innerHeight; // Each section is full screen height
        const newActiveIndex = Math.round(scrollTop / cardHeight);
        setActiveIndex(newActiveIndex);
    };

    const goToNextCard = () => {
        if (activeIndex < totalCards - 1) {
            setActiveIndex((prevIndex) => prevIndex + 1);
            scrollToCard(activeIndex + 1);
        }
    };

    const goToPreviousCard = () => {
        if (activeIndex > 0) {
            setActiveIndex((prevIndex) => prevIndex - 1);
            scrollToCard(activeIndex - 1);
        }
    };

    const scrollToCard = (index) => {
        const cardHeight = window.innerHeight;
        const container = document.querySelector(".stacked-card-container");
        container.scrollTo({
            top: cardHeight * index,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            {/* Progress Bar */}
            <div className="absolute z-50 top-4 left-4 right-4">
                <ProgressBar value={(activeIndex / (totalCards - 1)) * 100} />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute z-50 bottom-4 left-4 right-4 flex justify-between">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={goToPreviousCard}
                    disabled={activeIndex === 0}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={goToNextCard}
                    disabled={activeIndex === totalCards - 1}
                >
                    Next
                </button>
            </div>

            {/* Card Container */}
            <div className="stacked-card-container" onScroll={handleScroll}>
                <div>
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
