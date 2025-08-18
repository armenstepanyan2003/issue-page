import {useState} from "react";
import NewLabelModal from "./NewLabelModal.tsx";

function Labels({ labelsList, setLabelsList }) {

    const [showModalLabels, setShowModalLabels] = useState(false)
    const [editingLabels, setEditingLabels] = useState(null)

    const handleDeleteLabels = (id:number) => {
        const update = labelsList.filter(item => item.id !== id)
        setLabelsList(update)
    }

    const handleEditLabels = (label) => {
        setEditingLabels(label)
        setShowModalLabels(true)

    }

    const handleSaveLabel = (label) => {
        setShowModalLabels(false)

        if(editingLabels) {
            const updateLabel = labelsList.map((item) =>
                item.id === editingLabels.id ? {...item, ...label} : item
            );
            setLabelsList(updateLabel)
            setEditingLabels(null)
        } else {
            labelsList.push({
                ...label,
                id: labelsList[labelsList.length - 1].id + 1
            });
            setLabelsList(labelsList);
        }
    }

    return (
            <div className="space-y-2">
                <div className="flex justify-end">
                    <button className="cursor-pointer bg-gray-200 border p-3 border-gray-400" onClick={() => setShowModalLabels(true)}>Create New Label</button>
                </div>
                <div>
                    {showModalLabels && (
                        <NewLabelModal onSave={handleSaveLabel} />
                    )}
                </div>


                <div className="space-y-2">
                    {labelsList.map((label) => (
                        <div className='flex justify-between items-center gap-2 border rouned-lg p-2'>
                            <div key={label.id} style={{
                                backgroundColor: label.color
                            }} className="text-amber-100 max-w-fit p-2 rounded-md">
                                {label.name}
                            </div>

                            <div className="flex justify-between gap-3">
                                <button className="bg-red-200 cursor-pointer p-2" type="button" onClick={() => handleEditLabels(label)}>Edit</button>
                                <button className="bg-red-200 cursor-pointer p-2" type="button" onClick={() => handleDeleteLabels(label.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}
export default Labels