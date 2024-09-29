const CustomSection = ({ title, content }) => {
    return (
        <div className="bg-blue-500 text-white p-8">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    );
};
