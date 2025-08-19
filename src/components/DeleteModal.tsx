import type {FC} from "react";

interface IDeleteModal {
    yesDelete: (id:number) => void;
    noDelete: () => void;
}

const DeleteModal: FC<IDeleteModal> = ({yesDelete, noDelete}) => {
    return (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-200 p-8 rounded-xl shadow-xl w-80 flex flex-col space-y-4">
                <div>
                    <p>ARE YOU SURE?</p>
                </div>
                <div className="flex gap-2 items-center justify-around">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition" onClick={yesDelete}>YES</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition" onClick={noDelete}>NO</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;