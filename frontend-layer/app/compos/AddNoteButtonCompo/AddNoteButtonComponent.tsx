'use client';

import {ReactElement, useState} from "react";
import './addNoteButtonComponentStyling.css';
import Image from "next/image";

import UploadKindleHighlights from "@/app/compos/AddNoteButtonCompo/uploadKindleHighlights/UploadKindleHighlights";

import importIcon from '@/public/icons/upload-cloud-line.svg'

export default function AddNoteComponentButton(): ReactElement {
    const [isAddNoteButtonClicked, setIsAddNoteButtonClicked] = useState<boolean>(false);

    const handleAddNoteButtonClicked = (): void => {
        setIsAddNoteButtonClicked(prevState => !prevState);
    };

    const handleUploadFiles = (): void => {

    }

    return (
        <div className="addNoteButtonWrapper">
            {isAddNoteButtonClicked ? (
                <div className="otherButtonsContainer">
                    <button className="addNoteButton-twitter">
                        Import Twitter savings
                    </button>

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
