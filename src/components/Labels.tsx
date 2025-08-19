import {useCallback, useMemo, useState} from "react";
import NewLabelModal from "./NewLabelModal.tsx";
import type {Label} from "../types";
import type {LabelProps} from "../types"
import Pagination from "./Pagination/Pagination.tsx";
import EditDeleteButtons from "./EditDelete/EditDeleteButtons.tsx";
import DeleteModal from "./DeleteModal.tsx";

const itemsPerPage = 2;

function Labels({labelsList, setLabelsList}: LabelProps) {
    const [search, setSearch] = useState("");

    const searchingLabels = labelsList.filter((label) =>
        label.name.toLowerCase().includes(search.toLowerCase())
    );

    const [showModalLabels, setShowModalLabels] = useState<boolean>(false)
    const [editingLabels, setEditingLabels] = useState<Label | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const lastItem = useMemo(() => {
        return currentPage * itemsPerPage
    }, [currentPage]);

    const firstItem = useMemo(() => {
        return lastItem - itemsPerPage
    }, [lastItem]);

    const currentIssues = useMemo(() => {
        return searchingLabels.slice(firstItem, lastItem)
    }, [searchingLabels, firstItem, lastItem]);

    const totalPages = useMemo(() => {
        return Math.ceil(labelsList.length / itemsPerPage)
    }, [labelsList.length]);

    const handleDeleteLabels = (id: number) => {
        setDeletingItemId(id);
        setShowDeleteModal(true);
    };

    const yesDelete = (id: number) => {
        const update = labelsList.filter(item => item.id !== id)
        setLabelsList(update);
        setDeletingItemId(null);
        setShowDeleteModal(false);
    }

    const noDelete = () => {
        setShowDeleteModal(false);
    }

    const handleEditLabels = useCallback((label: Label) => {
        setEditingLabels(label)
        setShowModalLabels(true)
    }, []);

    const handleSaveLabel = (label: Label) => {
        setShowModalLabels(false)

        if (editingLabels) {
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
    };

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search..."
                           className="border p-2 w-150 rounded-xl shadow-lg "/>
                </div>
                <button
                    className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:bg-indigo-700 transition cursor-pointer"
                    onClick={() => setShowModalLabels(true)}
                >
                    Create New Label
                </button>
            </div>
            {showModalLabels && (
                <NewLabelModal onSave={handleSaveLabel} setShowModalLabels={setShowModalLabels}/>
            )}
            {showDeleteModal && (
                <DeleteModal  yesDelete={() => yesDelete(deletingItemId)} noDelete={noDelete}/>
            )}
            <div className="space-y-3">
                {currentIssues.map((label) => (
                    <div
                        key={label.id}
                        className="flex justify-between items-center gap-4 border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div
                            style={{backgroundColor: label.color}}
                            className="text-white font-semibold max-w-fit px-4 py-2 rounded-xl"
                        >
                            {label.name}
                        </div>
                        <EditDeleteButtons onDelete={() => handleDeleteLabels(label.id)} onEdit={() => handleEditLabels(label)} />
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}/>
        </div>
    )
}

export default Labels