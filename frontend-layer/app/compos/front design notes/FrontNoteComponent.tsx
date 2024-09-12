import {ReactElement} from "react";
import Image from "next/image"
import './frontNoteCompoStyling.css'

// imported icons
import MoreIcon from '@/public/icons/more-line.svg'
import BookCover from '@/public/bookCovers/there there cover.jpg'

export default function FrontNoteComponent(): ReactElement {
    return (
        <div className="homeContainer">
            <div className="topLayer">
                <div className="flashcardInfo">
                    {/*
                    h2#front design notes-name would also be the name of the front design notes if the user wants to create their own front design notes
                    p#autho-name will also be the brief info about the front design notes if the ...
                */}
                    <Image src={BookCover} alt="there there" width={100}/>

                    <div className="bookInfos">
                        <h2 id="bookTitle">There, there</h2>
                        <p id="author-name">- Tommy Orange</p>

                        <div className="bookTags">
                            <ul>
                                <li>#Poetry</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flashcardSettings">
                    <Image src={MoreIcon} alt="MoreIcon"/>
                </div>
            </div>
        </div>
    )
}