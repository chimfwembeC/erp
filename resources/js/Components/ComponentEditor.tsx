import React, { useState } from 'react';

const ComponentEditor = () => {
    const [title, setTitle] = useState('Welcome to Our Platform');
    const [content, setContent] = useState('This is dynamic content.');

    const saveComponent = async () => {
        const componentData = {
            component: 'CustomSection',
            props: {
                title,
                content,
            }
        };

        // Send component data to the backend
        const response = await fetch('/api/saveComponent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(componentData)
        });
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Edit title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Edit content"
            />
            <button onClick={saveComponent}>Save Component</button>

            {/* Live preview of the component */}
            <CustomSection title={title} content={content} />
        </div>
    );
};
