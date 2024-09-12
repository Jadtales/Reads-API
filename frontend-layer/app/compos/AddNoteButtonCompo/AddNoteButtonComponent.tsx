import {ReactElement} from "react";
import './addNoteButtonComponentStyling.css'



export default function AddNoteComponentButton(): ReactElement {
    return (
        <button className="addNoteComponent">
            Add a note <span id="addIcon">+</span>
        </button>
    )
}