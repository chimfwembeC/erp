const TextSection = ({ contentBlocks }) => {
    return (
        <div className="text-section">
            {contentBlocks.map((block, index) => (
                <p key={index} className="text-lg mb-4">{block.content}</p>
            ))}
        </div>
    );
};

export default TextSection;
