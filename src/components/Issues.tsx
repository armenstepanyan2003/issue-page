import {useMemo, useState} from "react";
import NewIssueModal from "./NewIssueModal.tsx";
import Pagination from "./Pagination/Pagination.tsx";
import EditDeleteButtons from "./EditDelete/EditDeleteButtons.tsx";
import type {EditingIssue, Issue} from "../types";
import type {IssuesProps} from "../types";
import DeleteModal from "./DeleteModal.tsx";

const itemsPerPage = 2;

function Issues({issueList, setIssueList, labelsList}: IssuesProps) {

    const [search, setSearch] = useState("");

    const searchingIssues = issueList.filter(issue =>
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.description.toLowerCase().includes(search.toLowerCase())
    );


    const [showModalIssue, setShowModalIssue] = useState<boolean>(false);
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const lastItem = useMemo(() => {
        return currentPage * itemsPerPage
    }, [currentPage]);

    const firstItem = useMemo(() => {
        return lastItem - itemsPerPage
    }, [lastItem])

    const currentIssues = useMemo(() => {
        return searchingIssues.slice(firstItem, lastItem)
    }, [searchingIssues,firstItem,lastItem ])

    const totalPages = useMemo(() => {
        return Math.ceil(issueList.length / itemsPerPage)
    }, [issueList.length])

    const handleDeleteIssues = (id: number) => {
        setDeletingItemId(id);
        setShowDeleteModal(true);
    }

    const yesDelete = (id: number) => {
        const update = issueList.filter(item => item.id !== id)
        setIssueList(update);
        setDeletingItemId(null);
        setShowDeleteModal(false);
    }

    const noDelete = () => {
        setShowDeleteModal(false);
    }

    const handleEditIssues = (issue:Issue) => {
        setEditingIssue(issue);
        setShowModalIssue(true);
    }

    const handleSave = (issue: EditingIssue) => {
        setShowModalIssue(false)

        if(editingIssue) {
            const updateIssues = issueList.map((item) =>
                item.id === editingIssue.id ? { ...item, ...issue } : item
            )
            setIssueList(updateIssues);
            setEditingIssue(null)
        } else {
            issueList.push({
                ...issue,
                id: issueList[issueList.length - 1].id + 1
            });
            setIssueList(issueList);
        }
    }

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <input type="search" value={search} onChange={(e) => setSearch((e.target.value))} placeholder="Search..." className="border p-2 w-150  rounded-xl shadow-lg"/>
                </div>
                <button
                    className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:bg-indigo-700 transition cursor-pointer"
                    onClick={() => setShowModalIssue(true)}
                >
                    Create New Issue
                </button>
            </div>
            {showModalIssue && (
                <NewIssueModal
                    onSave={handleSave}
                    editingIssue={editingIssue}
                    labelsList={labelsList}
                    setShowModalIssue={setShowModalIssue}
                />
            )}
            {showDeleteModal && (
                <DeleteModal yesDelete={() => yesDelete(deletingItemId)} noDelete={noDelete}/>
            )}
            <div className="space-y-4">
                {currentIssues.map((issue) => {
                    const labels = labelsList.filter((label) => issue.labels.includes(label.id));
                    return (
                        <div
                            key={issue.id}
                            className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-start gap-8">
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{issue.title}</p>
                                    <p className="text-gray-600 mt-1">{issue.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {labels.map((label) => (
                                            <span
                                                key={label.id}
                                                style={{ backgroundColor: label.color }}
                                                className="text-white text-sm font-semibold px-3 py-1 rounded-full"
                                            >
                    {label.name}
                  </span>
                                        ))}
                                    </div>
                                </div>
                                <EditDeleteButtons onDelete={() => handleDeleteIssues(issue.id)} onEdit={() => handleEditIssues(issue)} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    )
}

export default Issues