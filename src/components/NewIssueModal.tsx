import React, {useState} from 'react';

const NewIssueModal = ({ onSave, editingIssues,  labelsList}) => {
    const [title, setTitle] =useState(editingIssues?.title || "");
    const [description, setDescription] =useState(editingIssues?.description || "");
    const [labels, setLabels] =useState([]);

    const handleSave = () => {
        onSave({
            title,
            description,
            labels
        });
    };

    const toggleLabel = (id) => {
        if (labels.includes(id)) {
            setLabels(labels.filter(labelId => labelId !== id));
        } else {
            setLabels([...labels, id]);
        }
        console.log('labels',labels)
    }

    return (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-200 border p-6 rounded shadow-lg w-[400px] flex flex-col space-y-2">
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
                    <button className="bg-green-500 p-2 rounded-lg cursor-pointer" onClick={handleSave}>SAVE</button>
                </div>
            </div>
        </div>
    );
};

export default NewIssueModal;