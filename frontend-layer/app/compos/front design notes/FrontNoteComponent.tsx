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
    bookTags: string[] | string;
    notecardDeletion: (bookId: number, toCloseModalRef: any) => void;
}

export default function FrontNoteComponent({
                                               bookTitle,
                                               bookAuthor,
                                               bookId,
                                               bookTags,
                                               notecardDeletion
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
                                {Array.isArray(bookTags) ?
                                   (bookTags.map((tag, index) => <li key={index}>#{tag}</li>))
                                    :
                                   (typeof bookTags === 'string' && <li>#{bookTags}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flashcardSettingsContainer">

                    <FrontNoteSettings bookId={bookId} deleteThisNotecardById={notecardDeletion}/>
                </div>
            </div>
        </div>
    );
}
