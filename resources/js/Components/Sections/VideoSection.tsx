import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoSection = ({ videos }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="video-section w-full">
            <Slider {...settings}>
                {videos.map((video, index) => (
                    <div key={index} className="video-slide flex justify-center items-center">
                        <video
                            className="w-full max-h-96 rounded-lg shadow-lg"
                            controls
                            src={video.url}
                            preload="auto"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default VideoSection;
