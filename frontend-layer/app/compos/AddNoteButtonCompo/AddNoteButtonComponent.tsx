import {ReactElement} from "react";
import Image from "next/image";
import './addNoteComponentStyling.css'

export default function AddNoteComponentButton(): ReactElement {
    return (
        <button className="addNoteComponent">
            Add a note <span id="addIcon">+</span>
        </button>
    )
}