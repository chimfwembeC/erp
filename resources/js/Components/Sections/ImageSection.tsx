const ImageSection = ({ contentBlocks }) => {
    return (
        <div className="image-section grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentBlocks.map((block, index) => (
                <img key={index} src={block.content} alt={`Image ${index}`} className="w-full h-auto" />
            ))}
        </div>
    );
};

export default ImageSection;
