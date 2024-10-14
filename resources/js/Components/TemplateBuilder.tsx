import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const TemplateBuilder = () => {
    const [sections, setSections] = useState([]);
    const [templateName, setTemplateName] = useState('');

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

    const handleSaveTemplate = async () => {
        try {
            await axios.post('/api/templates', { name: templateName, sections });
            alert('Template saved successfully!');
        } catch (error) {
            console.error('Error saving template:', error);
            alert('Error saving template.');
        }
    };

    return (
        <div className="template-builder">
            <h2>Template Builder</h2>
            <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Template Name"
            />

            <div className="section-controls">
                <button onClick={() => handleAddSection('text')}>Add Text Section</button>
                <button onClick={() => handleAddSection('image')}>Add Image Section</button>
                <button onClick={() => handleAddSection('video')}>Add Video Section</button>
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

            <button onClick={handleSaveTemplate}>Save Template</button>
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

export default TemplateBuilder;
