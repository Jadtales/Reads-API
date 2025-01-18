'use client';

import {ReactElement, useState} from "react";
import Image from "next/image";
import './frontNoteCompoStyling.css';

// imported icons
import BookCover from '@/public/bookCovers/there there cover.jpg';

import FrontNoteSettings from "@/app/compos/front design notes/frontNote-settingsOption/FrontNoteSettings";
import PinnedNotecardComponent
    from "@/app/compos/front design notes/utility-components/pinned-li-element-component/PinnedNotecardComponent";

interface frontNoteComponentProps {
    bookCredentials: {
        bookTitle: string;
        bookAuthor: string;
        bookId: number;
        bookCover?: string;
        bookTags: string[] | string;
        bookHighlights?: {highlightKey: number, highlightText: string}[];
    };
    isNotecardToPin: (toPin: boolean, bookId: number) => void;
    notecardDeletion: (bookId: number, toCloseModalRef: any) => void;
}

export default function FrontNoteComponent({
                                               bookCredentials,
                                               notecardDeletion,
                                               isNotecardToPin,
                                           }: frontNoteComponentProps): ReactElement<any> {

    const [isNotecardPinned, setIsNotecardPinned] = useState<boolean>(false);
    const {bookTitle,
        bookAuthor,
        bookId,
        bookCover,
        bookTags,} = bookCredentials;

    isNotecardToPin(isNotecardPinned, bookId);

    return (
        <div className="homeContainer">

            <div className="topLayer">

                <div className="flashcardInfo">

                    <Image src={bookCover || BookCover} alt="there there" width={100} height={151}/>

                    <div className="bookInfos">
                        <h2 id="bookTitle">{bookTitle}</h2>
                        <p id="author-name">{bookAuthor}</p>

                        <div className="bookTags">
                            <ul>
                                {Array.isArray(bookTags) ?
                                    (bookTags.map((tag, index) => <li key={index}>#{tag}</li>))
                                    :
                                    (typeof bookTags === 'string' && <li>#{bookTags}</li>)}
                                {isNotecardPinned && <PinnedNotecardComponent/>}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flashcardSettingsContainer">
                    <FrontNoteSettings notecardCredentials={{bookId, bookTags, bookTitle}}
                                       deleteThisNotecardById={notecardDeletion}
                                       checkIsNotecardPinned={setIsNotecardPinned}/>
                </div>
            </div>
        </div>
    );
}
