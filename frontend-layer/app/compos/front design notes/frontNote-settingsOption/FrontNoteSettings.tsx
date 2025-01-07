'use client';

import React, {Fragment, MouseEvent as ReactMouseEvent, ReactElement, useEffect, useRef} from "react";
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
import MoreIcon from "@/public/icons/more-line.svg";

interface FrontNoteSettingsProps {
    bookTitle?: string;
    bookId: number;
    deleteThisNotecardById: (bookId: number, toCloseModalRef: any) => void;
    // tagsForModal: string[];
}

export default function FrontNoteSettings({
                                              bookId,
                                              bookTitle,
                                              deleteThisNotecardById
                                          }: FrontNoteSettingsProps): ReactElement<any> {
    const settingsRef = useRef<HTMLDialogElement>(null);

    const router = useRouter()

    const handleSettingsToggling = (event: ReactMouseEvent): void => {
        event.stopPropagation()
        if(!settingsRef.current?.open) {
            settingsRef.current?.show();
        }
    }

    // to prevent propagation during the interaction with settings modal
    const handleSettingsModalClosing = (event: ReactMouseEvent): void => {
        if(settingsRef.current?.open) {
            event.stopPropagation();
        }
    }

    // --- to go to the edit page of the NoteCard
    const handleForwardToReviewPage = () => {
        router.push(`/createnotes/${bookTitle?.replaceAll(' ', '-')}-${bookId}`)
    };

    const handleDeleteNotecard = (event: ReactMouseEvent, toCloseModalRef: any) => {
        if (event) {
            deleteThisNotecardById(bookId, toCloseModalRef)
        }
    };

    // Add event listeners for click outside and Escape key
    useEffect(() => {
        const dialog = settingsRef.current;

        const handleClickOutside = (event: MouseEvent): void => {
            if(dialog && !dialog.contains(event.target as Node)){
                dialog.close();
            }
        }

        const handleEscapeKey = (event: KeyboardEvent): void => {
            if(event.key === 'Escape'){
                dialog?.close();
            }
        }

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        // Clean up event listeners
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <Fragment>
            <button className={'settingsButton'} onClick={handleSettingsToggling}><Image src={MoreIcon} alt="MoreIcon"/></button>
            <dialog className="frontNoteSettingContainer" ref={settingsRef} onClick={handleSettingsModalClosing}>
                <ul>
                    <li><Image src={PinNoteIcon} width={20} alt="pinNote"/>Pin</li>
                    <li onClick={handleForwardToReviewPage}><Image src={EditNoteIcon} width={20} alt="editNote"/>Edit
                        this
                        Note
                    </li>
                    <MoveToComponent/>
                    <li><Image src={DownloadIcon} width={20} alt="exportNote"/>Export</li>
                    <hr style={{margin: '5px 0'}}/>
                    <DeleteNotecardModal deleteIsClicked={handleDeleteNotecard}/>
                </ul>
            </dialog>
        </Fragment>
    );
}