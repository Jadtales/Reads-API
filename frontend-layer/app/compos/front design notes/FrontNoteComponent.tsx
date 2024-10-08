'use client';

import {ReactElement, useRef, useState} from "react";
import Image from "next/image";
import './frontNoteCompoStyling.css';

// imported icons
import MoreIcon from '@/public/icons/more-line.svg';
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
                                               bookId,
                                               bookTags
                                           }: frontNoteComponentProps): ReactElement {
    const [isNotecardSettingActive, setIsNotecardSettingActive] = useState<boolean>(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    const handleDocumentClick = (event: MouseEvent) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
            closeSettings(); // Close the settings if clicked outside
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeSettings(); // Close settings on Escape press
        }
    };

    const openSettings = () => {
        setIsNotecardSettingActive(true);

        // Add event listeners when settings are opened
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyPress);
    };

    const closeSettings = () => {
        setIsNotecardSettingActive(false);

        // Remove event listeners when settings are closed
        document.removeEventListener('click', handleDocumentClick);
        document.removeEventListener('keydown', handleKeyPress);
    };

    // This function allows toggling between open and closed states.
    const toggleSettings = () => {
        if (isNotecardSettingActive) {
            closeSettings(); // If already open, close it
        } else {
            // delay to ensure the current click is registered before adding the event listener
            setTimeout(() => {
                openSettings();
            }, 0);
        }
    };

    return (
        <div className="homeContainer">
            <div className="topLayer">
                <div className="flashcardInfo">
                    <Image src={BookCover} alt="there there" width={100}/>

                    <div className="bookInfos">
                        <h2 id="bookTitle">{bookTitle}</h2>
                        <p id="author-name">- {bookAuthor}</p>

                        <div className="bookTags">
                            <ul>
                                <li>#{bookTags}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flashcardSettingsContainer">
                    <div
                        className="flashcardSettings"
                        onClick={toggleSettings} // Toggle the settings on click
                    >
                        <Image src={MoreIcon} alt="MoreIcon"/>
                    </div>
                    {isNotecardSettingActive && (
                        <div ref={settingsRef}>
                            <FrontNoteSettings onClose={closeSettings}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
