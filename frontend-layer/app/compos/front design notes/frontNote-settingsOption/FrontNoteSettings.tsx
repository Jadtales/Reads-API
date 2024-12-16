'use client';

import React, {ReactElement, useEffect, useRef} from "react";
import Image from "next/image";
import './frontNoteSettingStyling.css';

// imported icons
import DownloadIcon from '@/public/icons/frontNoteSetting-icons/download-line.svg';
import EditNoteIcon from '@/public/icons/frontNoteSetting-icons/pencil-line.svg';
import PinNoteIcon from '@/public/icons/frontNoteSetting-icons/pushpin-2-line.svg';
import MoveToComponent
    from "@/app/compos/front design notes/frontNote-settingsOption/settingsComponents/MoveToComponent";
import {useRouter} from "nextjs-toploader/app";

interface FrontNoteSettingsProps {
    onClose: () => void; // Callback to close settings
    bookTitle: string;
    bookId: number;
    // tagsForModal: string[];
}

export default function FrontNoteSettings({onClose, bookId, bookTitle}: FrontNoteSettingsProps): ReactElement {
    const settingsRef = useRef<HTMLDivElement>(null);

    const router = useRouter()

    const prevent = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    // Detect click outside to close settings
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    // --- to go to the edit page of the NoteCard
    const handleForwardToReviewPage = () => {
        router.push(`/createnotes/${bookTitle.replaceAll(' ', '-')}-${bookId}`)
    }


    return (
        <div className="frontNoteSettingContainer" ref={settingsRef} onClick={prevent}>
            <ul>
                <li><Image src={PinNoteIcon} width={20} alt="pinNote"/>Pin</li>
                <li onClick={handleForwardToReviewPage}><Image src={EditNoteIcon} width={20} alt="editNote"/>Edit this Note</li>
                <MoveToComponent/>
                <li><Image src={DownloadIcon} width={20} alt="exportNote"/>Export</li>
                <hr style={{margin: '5px 0'}}/>
                <li>Delete</li>
            </ul>
        </div>
    );
}