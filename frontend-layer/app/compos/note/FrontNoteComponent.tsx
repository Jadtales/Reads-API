import {ReactElement} from "react";
import Image from "next/image"
import './frontNoreCompoStyling.css'

// imported icons
import MoreIcon from '@/public/icons/more-line.svg'

export default function FrontNoteComponent(): ReactElement {
    return (
        <div className="homeContainer">
            <div className="topLayer">
                <div className="flashcardInfo">
                    {/*
                    h2#note-name would also be the name of the note if the user wants to create their own note
                    p#autho-name will also be the brief info about the note if the ...
                */}
                    <h2 id="flashcard-name">There, there</h2>
                    <p id="author-name">Tommy Orange</p>
                </div>

                <div className="flashcardSettings">
                    <Image src={MoreIcon} alt="MoreIcon"/>
                </div>
            </div>
        </div>
    )
}