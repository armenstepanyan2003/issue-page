import React, {useState} from 'react';

const NewLabelModal = ({ onSave }) => {
    const [name, setName] =useState('');
    const [color, setColor] =useState('');

    const handleSaveLabel = () => {
        onSave({
            name,
            color,
        });
    };

    return (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-200 p-6 border rounded shadow-md w-[300px] flex flex-col space-y-2">
                <p>Enter Title</p>
                <input className="border rounded-2xl p-2" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <p>Choose Color</p>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
                <div>
                    <button className="bg-green-500 p-2 rounded-lg cursor-pointer" onClick={handleSaveLabel}>SAVE</button>
                </div>
            </div>
        </div>
    );
};

export default NewLabelModal;