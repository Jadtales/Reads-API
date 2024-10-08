import {ReactElement} from "react";

import '../notesCreationCompoStyling.css'

export default function NoteDescriptionAndTitleComponent(): ReactElement {
    return (
        <div className="NoteDescriptionAndTitleComponentContainer">
            <div className="noteTitle">
                <h1>Title</h1>
                <input type="text" placeholder="Enter the book title"/>
            </div>

            <div className="noteDescription">
                <h1>Description and Tags</h1>
                <input type="text" placeholder="Write yout description"/>

                <div className="noteTags">
                    <button>Add a tag +</button>
                </div>
            </div>
        </div>
    )
}