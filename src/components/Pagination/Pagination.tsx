import type {FC} from "react";

interface IEditDeleteButtons {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

const Pagination: FC<IEditDeleteButtons> = ({ currentPage, onPageChange, totalPages }) => {
    const onNext= () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    return (
        <div className="flex justify-end gap-6 mt-4 items-center">
            <button
                className="border border-gray-300 bg-white hover:bg-gray-100 py-2 px-5 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={currentPage === 1}
                onClick={onPrevious}
            >
                Previous
            </button>
            <span className="bg-blue-200 rounded-full p-3">{currentPage}</span>
            <button
                className="border border-gray-300 bg-white hover:bg-gray-100 py-2 px-5 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={currentPage === totalPages}
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;