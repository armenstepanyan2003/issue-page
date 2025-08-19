import React, {useState} from 'react';

const NewLabelModal = ({ onSave, setShowModalLabels }) => {
    const [name, setName] =useState<string>('');
    const [color, setColor] =useState<string>('');

    const handleSaveLabel = () => {
        onSave({
            name,
            color,
        });
    };

    const closeModal = () => {
        setShowModalLabels(false)
    }

    return (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-gray-200 p-8 rounded-xl shadow-xl w-80 flex flex-col space-y-4">
                <p className="text-lg font-semibold text-gray-700">Enter Title</p>
                <input
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Label name"
                />
                <p className="text-lg font-semibold text-gray-700">Choose Color</p>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-12 cursor-pointer rounded-lg"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition"
                        onClick={handleSaveLabel}
                    >
                        SAVE
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-xl transition"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewLabelModal;