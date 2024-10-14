import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SectionBuilder = ({ template }) => {
    const [sections, setSections] = useState([]);
    const [currentSection, setCurrentSection] = useState(null);

    const handleAddSection = (type) => {
        const newSection = {
            id: Date.now(),
            type: type,
            content: '',
        };
        setSections([...sections, newSection]);
    };

    const handleSectionChange = (id, value) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === id ? { ...section, content: value } : section
            )
        );
    };

    const handleRemoveSection = (id) => {
        setSections((prevSections) => prevSections.filter((section) => section.id !== id));
    };

    const handleDragEnd = (event) => {
        // Logic for rearranging sections
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id);
            const newIndex = sections.findIndex((s) => s.id === over.id);
            const updatedSections = [...sections];
            const [movedSection] = updatedSections.splice(oldIndex, 1);
            updatedSections.splice(newIndex, 0, movedSection);
            setSections(updatedSections);
        }
    };

    return (
        <div className="section-builder">
            <h2>{template.name} - Section Builder</h2>

            <div className="section-controls">
                <button onClick={() => handleAddSection('text')}>Add Text Section</button>
                <button onClick={() => handleAddSection('image')}>Add Image Section</button>
                <button onClick={() => handleAddSection('video')}>Add Video Section</button>
                {/* Add more section types as needed */}
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div className="sections-container">
                    {sections.map((section) => (
                        <Section
                            key={section.id}
                            section={section}
                            onChange={handleSectionChange}
                            onRemove={handleRemoveSection}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

const Section = ({ section, onChange, onRemove }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: section.id,
    });

    const renderContentEditor = () => {
        switch (section.type) {
            case 'text':
                return (
                    <ReactQuill
                        value={section.content}
                        onChange={(value) => onChange(section.id, value)}
                        placeholder="Enter text..."
                    />
                );
            case 'image':
                return (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(section.id, e.target.files[0])}
                    />
                );
            case 'video':
                return (
                    <input
                        type="text"
                        placeholder="Enter video URL..."
                        value={section.content}
                        onChange={(e) => onChange(section.id, e.target.value)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} className="section">
            <div className="section-header">
                <h4>{section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section</h4>
                <button onClick={() => onRemove(section.id)}>Remove</button>
            </div>
            <div className="section-content">{renderContentEditor()}</div>
        </div>
    );
};

export default SectionBuilder;
