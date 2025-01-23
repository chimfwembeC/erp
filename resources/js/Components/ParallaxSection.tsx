import React from "react";

const ParallaxSection = ({ children }) => {
    return (
        <div className="relative h-96">
            {/* Background */}
            <div className="absolute inset-0 bg-fixed bg-cover bg-parallax"></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Foreground Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
