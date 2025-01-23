import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";

const allImages = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1498598453733-d6f4e1d08c48?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1528747008801-7f2c0925a3d5?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1501975558165-58f3d86a3dff?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1515390132507-1be404d53cdb?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1514512256592-3973dc1c2894?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1571748989047-95a507fc6d74?w=500&auto=format&fit=crop&q=60",
];

const MasonryGallery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(15);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(allImages.length / imagesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const fallbackImage =
        "https://images.unsplash.com/photo-1498598453733-d6f4e1d08c48?w=500&auto=format&fit=crop&q=60";

    return (
        <div className="h-full p-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <Masonry columnsCount={3} gutter="10px">
                        {currentImages.map((image, i) => (
                            <div
                                key={i}
                                className="relative overflow-hidden rounded-lg group"
                                style={{
                                    cursor: "pointer",
                                    transformOrigin: "center",
                                }}
                            >
                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center"
                                >
                                    <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        View Image
                                    </p>
                                </div>
                                {/* Image */}
                                <img
                                    src={image ? image : fallbackImage}
                                    alt={`Masonry image ${i}`}
                                    style={{
                                        width: "100%",
                                        display: "block",
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                    className="group-hover:scale-110"
                                // onError={(e) => (e.target.src = fallbackImage)}
                                />
                            </div>
                        ))}
                    </Masonry>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeftCircle size={24} />
                            Previous
                        </button>
                        <button
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(allImages.length / imagesPerPage)}
                        >
                            Next
                            <ArrowRightCircle size={24} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MasonryGallery;
