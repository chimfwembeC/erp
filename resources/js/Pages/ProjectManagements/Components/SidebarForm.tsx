import React from 'react';

interface SidebarFormProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    selectedType: string;
}

const SidebarForm: React.FC<SidebarFormProps> = ({ formData, handleChange, selectedType }) => {
    return (
        <div className="w-1/2 bg-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Form</h2>

            <div className="mb-4">
                <label className="block">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                ></textarea>
            </div>

            {selectedType === 'issue' && (
                <div className="mb-4">
                    <label className="block">Milestone</label>
                    <select
                        name="milestone_id"
                        value={formData.milestone_id}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">Select Milestone</option>
                        {/* Populate with milestones */}
                    </select>
                </div>
            )}

            {selectedType === 'task' && (
                <div className="mb-4">
                    <label className="block">Due Date</label>
                    <input
                        type="datetime-local"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default SidebarForm;
