import {ReactElement} from "react";
import './notesGrid.css'

import FolderComponent from "@/app/compos/foldersComponent/FolderComponent";
import FrontNoteComponent from "@/app/compos/note/FrontNoteComponent";


export default function Folder(): ReactElement {
    return (
        <div>
            <FolderComponent/>

            <div className="notes">
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>
                <FrontNoteComponent/>


            </div>
        </div>
    )
}