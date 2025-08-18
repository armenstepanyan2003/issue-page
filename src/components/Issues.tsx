import {useState} from "react";
import NewIssueModal from "./NewIssueModal.tsx";

function Issues({issueList, setIssueList, labelsList}) {

    const [showModalIssue, setShowModalIssue] = useState(false);
    const [editingIssues, setEditingIssues] = useState(null)

    const handleDeleteIssues = (id:number) => {
        const update = issueList.filter(item => item.id !== id)
        setIssueList(update)
    }

    const handleEditIssues = (issue) => {
        setEditingIssues(issue);
        setShowModalIssue(true);
    }

    const handleSave = (issue) => {
        setShowModalIssue(false)

        if(editingIssues) {
            const updateIssues = issueList.map((item) =>
            item.id === editingIssues.id ? { ...item, ...issue } : item
            )
            setIssueList(updateIssues);
            setEditingIssues(null)
        } else {
            issueList.push({
                ...issue,
                id: issueList[issueList.length - 1].id + 1
            });
            setIssueList(issueList);
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-end">
                <button className="cursor-pointer bg-gray-200 border p-3 border-gray-400" onClick={() => setShowModalIssue(true)}>Create New Issue</button>
            </div>
            <div>
                {showModalIssue && (
                    <NewIssueModal onSave={handleSave} editingIssues={editingIssues} labelsList={labelsList}/>
                )}
            </div>
            <div>
                    {issueList.map((issue) => {
                        const labels = labelsList.filter(label => issue.labels.includes(label.id))
                        console.log(labels)
                     return (
                        <div key={issue.id} className="border-2 rouned-md p-2">
                            <div className="flex justify-between">
                                <div className="space-y-2">
                                    <p className='text-2xl'>{issue.title}</p>
                                    <span>{issue.description}</span>
                                    <div>
                                        {
                                            labels.map((label, idx) => (
                                                <div style={{
                                                    background: label.color
                                                }} key={idx}>{label.name}</div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <button className="bg-red-200 cursor-pointer p-2" type="button" onClick={() => handleEditIssues(issue)}>Edit</button>
                                    <button className="bg-red-200 cursor-pointer p-2" type="button" onClick={() => handleDeleteIssues(issue.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}

export default Issues