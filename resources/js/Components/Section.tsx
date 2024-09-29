import React from 'react';

// Components for different section types
import TextSection from './Sections/TextSection';
import ImageSection from './Sections/ImageSection';
import SliderSection from './Sections/SliderSection';
import VideoSection from './Sections/VideoSection';

// Main Section Component
const Section = ({ section }) => {
    // Determine which component to render based on the section type
    switch (section.type) {
        case 'text':
            return <TextSection contentBlocks={section.content_blocks} />;
        case 'image':
            return <ImageSection contentBlocks={section.content_blocks} />;
        case 'slider':
            return <SliderSection contentBlocks={section.content_blocks} />;
        case 'video':
            return <VideoSection contentBlocks={section.content_blocks} />;
        default:
            return <div>Unknown section type</div>;
    }
};

export default Section;
