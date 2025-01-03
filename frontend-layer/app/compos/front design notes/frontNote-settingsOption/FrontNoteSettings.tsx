'use client';

import React, {MouseEvent as ReactMouseEvent, ReactElement, useRef} from "react";
import Image from "next/image";
import './frontNoteSettingStyling.css';

// imported icons
import DownloadIcon from '@/public/icons/frontNoteSetting-icons/download-line.svg';
import EditNoteIcon from '@/public/icons/frontNoteSetting-icons/pencil-line.svg';
import PinNoteIcon from '@/public/icons/frontNoteSetting-icons/pushpin-2-line.svg';
import MoveToComponent
    from "@/app/compos/front design notes/frontNote-settingsOption/settingsComponents/MoveToComponent";
import {useRouter} from "nextjs-toploader/app";
import DeleteNotecardModal from "@/app/compos/modals/delete-notecard-modal/DeleteNotecardModal";

interface FrontNoteSettingsProps {
    bookTitle: string;
    bookId: number;
    deleteThisNotecardById: (bookId: number, modalRef?: any) => void;
    // tagsForModal: string[];
}

export default function FrontNoteSettings({
                                              bookId,
                                              bookTitle,
                                              deleteThisNotecardById
                                          }: FrontNoteSettingsProps): ReactElement<any> {
    const settingsRef = useRef<HTMLDivElement>(null);

    const router = useRouter()

    const prevent = (event: React.MouseEvent) => {
        event.stopPropagation();
    };


    // --- to go to the edit page of the NoteCard
    const handleForwardToReviewPage = () => {
        router.push(`/createnotes/${bookTitle.replaceAll(' ', '-')}-${bookId}`)
    };

    const handleDeleteNotecard = (event: ReactMouseEvent) => {
        if (event) {
            deleteThisNotecardById(bookId)
        }
    };

    return (
        <div className="frontNoteSettingContainer" ref={settingsRef} onClick={prevent}>
            <ul>
                <li><Image src={PinNoteIcon} width={20} alt="pinNote"/>Pin</li>
                <li onClick={handleForwardToReviewPage}><Image src={EditNoteIcon} width={20} alt="editNote"/>Edit this
                    Note
                </li>
                <MoveToComponent/>
                <li><Image src={DownloadIcon} width={20} alt="exportNote"/>Export</li>
                <hr style={{margin: '5px 0'}}/>
                <DeleteNotecardModal deleteIsClicked={handleDeleteNotecard}/>
            </ul>
        </div>
    );
}