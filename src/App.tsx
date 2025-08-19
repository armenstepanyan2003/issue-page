import './App.css'
import Issues  from "./components/Issues.tsx";
import Labels from "./components/Labels.tsx";
import {useState} from "react";
import type {Label} from "./types";
import type {Issue} from "./types";
import type {Tab} from "./types";

const initialIssueList: Issue[] = [
    {id: 1, title: 'Tiffany0909', description: 'about Tiffany0909', labels: [1, 2, 3]},
    {id: 2, title: 'Vulnerabilities', description: 'about Vulnerabilities', labels: [1, 2]},
    {id: 3, title: 'Game', description: 'about Game', labels: [1]},
];

const initialLabelsList: Label[] = [
    {id: 1, name: 'bug', color: 'red'},
    {id: 2, name: 'feature', color: 'green'},
    {id: 3, name: 'question', color: 'red'},
];

const tab: Tab[] = [
    {
        label: 'Issues',
        value: 'issues',
    },
    {
        label: 'Labels',
        value: 'labels',
    },
];

function App() {
    const [issueList, setIssueList] = useState<Issue[]>(initialIssueList)
    const [labelsList, setLabelsList] = useState<Label[]>(initialLabelsList)
    const [selectTab, setSelectTab] = useState<'issues' | 'labels'>(tab[0].value)

    return (
        <>
            <div className="space-y-2">
                <div className="bg-gray-200 flex justify-between gap-2 rounded-md max-w-fit p-2">
                    {
                        tab.map((tab: Tab, index: number) => (
                            <div className="border p-3 border-gray-500 cursor-pointer " key={index} onClick={()=> setSelectTab(tab.value)}>{tab.label}</div>
                        ))
                    }
                </div>
                <div className="">
                    {
                        selectTab === 'issues' && ( <Issues issueList={issueList} setIssueList={setIssueList} labelsList={labelsList} />)
                    }
                    {
                        selectTab === 'labels' && (<Labels labelsList={labelsList} setLabelsList={setLabelsList} />)
                    }
                </div>

            </div>
        </>
    )
}

export default App
