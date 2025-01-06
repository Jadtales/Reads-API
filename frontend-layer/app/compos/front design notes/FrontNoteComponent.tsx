'use client';

import {ReactElement} from "react";
import Image from "next/image";
import './frontNoteCompoStyling.css';

// imported icons
import BookCover from '@/public/bookCovers/there there cover.jpg';
import FrontNoteSettings from "@/app/compos/front design notes/frontNote-settingsOption/FrontNoteSettings";


interface frontNoteComponentProps {
    bookTitle: string;
    bookAuthor: string;
    bookId: number;
    bookTags: string;
}

export default function FrontNoteComponent({
                                               bookTitle,
                                               bookAuthor,
                                               bookTags,
                                           }: frontNoteComponentProps): ReactElement<any> {

    return (
        <div className="homeContainer">
            <div className="topLayer">
                <div className="flashcardInfo">

                    <Image src={BookCover} alt="there there" width={100}/>

                    <div className="bookInfos">
                        <h2 id="bookTitle">{bookTitle}</h2>
                        <p id="author-name">{bookAuthor}</p>

                        <div className="bookTags">
                            <ul>
                                <li>#{bookTags}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flashcardSettingsContainer">
                    <FrontNoteSettings/>
                </div>
            </div>
        </div>
    );
}
