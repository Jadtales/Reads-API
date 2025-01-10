'use client';
import { ReactElement, useState, useRef } from 'react';
import './addNoteButtonComponentStyling.css';
import { useRouter } from 'nextjs-toploader/app';
import {useMediaQuery} from "react-responsive";
import KindleHighlightsSelectionComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/kindle/kindleHighlightsComponents/KindleHighlightsSelectionComponent";
import HighlightsInterface from "@/utils/interfaces/HighlightsInterface";
import NoteCardInterface from "@/utils/interfaces/NoteCardInterace";

interface ComponentsProps{
    getNewSelectedKindleHighlights: (selectedHighlights: Set<NoteCardInterface>) => void;
}

export default function AddNoteComponentButton({getNewSelectedKindleHighlights}: ComponentsProps): ReactElement<HTMLDivElement> | undefined {
    const [isAddNoteButtonClicked, setIsAddNoteButtonClicked] = useState<boolean>(false);
    const isInPhoneSize = useMediaQuery({query: '(width >= 700px)'});
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

    if(!isInPhoneSize) return;

    return (
        <div className="addNoteButtonWrapper" ref={buttonRef}>
            {isAddNoteButtonClicked ? (
                <div className="otherButtonsContainer">
                    <button className="addNoteButton-twitter">Import Twitter savings</button>

                    <KindleHighlightsSelectionComponent buttonBorderRadius={'4px'}
                                                        buttonBorder={'1px solid #3d3d3d'}
                                                        buttonPadding={'15px 10px'}
                                                        buttonTextColor={'white'}
                                                        newSelectedKindleHighlights={getNewSelectedKindleHighlights}
                    />
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
