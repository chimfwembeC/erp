import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderSection = ({ contentBlocks }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="slider-section">
            <Slider {...settings}>
                {contentBlocks.map((block, index) => (
                    <div key={index}>
                        <img
                            src={block.content}
                            alt={`Slide ${index}`}
                            className="w-full h-auto"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderSection;
