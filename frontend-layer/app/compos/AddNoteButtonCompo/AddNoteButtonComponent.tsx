'use client';
import { ReactElement, useState, useRef } from 'react';
import './addNoteButtonComponentStyling.css';
import UploadKindleHighlights from "@/app/compos/AddNoteButtonCompo/uploadKindleHighlights/UploadKindleHighlights";
import { useRouter } from 'nextjs-toploader/app';

export default function AddNoteComponentButton(): ReactElement {
    const [isAddNoteButtonClicked, setIsAddNoteButtonClicked] = useState<boolean>(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const router = useRouter()

    const handleAddNoteButtonClicked = (): void => {
        setIsAddNoteButtonClicked(!isAddNoteButtonClicked);

        // Add document click listener when expanded
        if (!isAddNoteButtonClicked) {
            document.addEventListener('click', handleClickOutside, true);
        }

        if(isAddNoteButtonClicked){
            router.push(`/createnotes/new-note-card`)
        }
    };

    const handleClickOutside = (event: MouseEvent): void => {
        // Check if the click is outside the buttonRef
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setIsAddNoteButtonClicked(false);

            // Remove the event listener after collapsing
            document.removeEventListener('click', handleClickOutside, true);
        }
    };


    return (
        <div className="addNoteButtonWrapper" ref={buttonRef}>
            {isAddNoteButtonClicked ? (
                <div className="otherButtonsContainer">
                    <button className="addNoteButton-twitter">Import Twitter savings</button>

                    <UploadKindleHighlights/>

                    <button className="addNoteButton" onClick={handleAddNoteButtonClicked}>
                        Add a note +
                    </button>
                </div>
            ) : (
                <button className="addNoteButton" onClick={handleAddNoteButtonClicked}>
                    Add a note +
                </button>
            )}
        </div>
    );
}
