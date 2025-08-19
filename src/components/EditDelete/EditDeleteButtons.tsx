import type {FC} from "react";

interface IEditDeleteButtons {
    onEdit: () => void;
    onDelete: () => void;
}

const EditDeleteButtons: FC<IEditDeleteButtons> = ({onEdit, onDelete }) => {
    return (
        <div className="flex flex-col gap-3">
            <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-xl transition cursor-pointer"
                onClick={onEdit}
            >
                Edit
            </button>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-xl transition cursor-pointer"
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default EditDeleteButtons;