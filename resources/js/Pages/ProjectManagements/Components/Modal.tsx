import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (type: string, formData: any) => void;
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, selectedType, setSelectedType, formData, handleChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end z-50">
            <div className="bg-white p-6 rounded-lg w-full">
                <h2 className="text-lg font-semibold mb-4">Select Type</h2>
                <form onSubmit={(e) => onSubmit(selectedType, formData)}>
                    <div className="mb-4">
                        <label className="block">
                            <input
                                type="radio"
                                name="type"
                                value="issue"
                                checked={selectedType === 'issue'}
                                onChange={(e) => setSelectedType(e.target.value)}
                            />
                            Issue
                        </label>
                        <label className="block">
                            <input
                                type="radio"
                                name="type"
                                value="task"
                                checked={selectedType === 'task'}
                                onChange={(e) => setSelectedType(e.target.value)}
                            />
                            Task
                        </label>
                    </div>

                    {(selectedType === 'issue' || selectedType === 'task') && (
                        <div>
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
                    )}

                    <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
                        Create {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-red-500">Close</button>
            </div>
        </div>
    );
};

export default Modal;
