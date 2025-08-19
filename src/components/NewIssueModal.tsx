import React, {useState} from 'react';
import type {EditingIssue, Issue, Label} from '../types';

interface NewIssueModalProps {
    onSave: (issue: EditingIssue) => void;
    editingIssue: Issue | null;
    labelsList: Label[];
    setShowModalIssue:  React.Dispatch<React.SetStateAction<boolean>>
}

const NewIssueModal = ({ onSave, editingIssue,  labelsList, setShowModalIssue}: NewIssueModalProps) => {
    const [title, setTitle] =useState<string>(editingIssue?.title || "");
    const [description, setDescription] =useState<string>(editingIssue?.description || "");
    const [labels, setLabels] =useState<number[]>([]);

    const handleSave = () => {
        onSave({
            title,
            description,
            labels
        });
    };

    const closeIssue = () => {
        setShowModalIssue(false)
    }

    const toggleLabel = (id: number) => {
        if (labels.includes(id)) {
            setLabels(labels.filter(labelId => labelId !== id));
        } else {
            setLabels([...labels, id]);
        }
        console.log('labels',labels)
    }

    return (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-200 p-8 rounded-xl shadow-xl w-80 flex flex-col space-y-4">
                <p>Enter Title</p>
                <input className="border rounded-2xl p-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <p>Enter Description</p>
                <input className="border rounded-2xl p-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div>
                    {labelsList.map(label => (
                        <button
                            key={label.id}
                            onClick={() => toggleLabel(label.id)}
                            style={{
                                backgroundColor: labels.includes(label.id) ? label.color : "#ddd",
                                color: labels.includes(label.id) ? "white" : "black",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                            }}
                        >
                            {label.name}
                        </button>
                    ))}
                </div>

                <div>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition" onClick={handleSave}>SAVE</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-xl transition" onClick={closeIssue}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default NewIssueModal;