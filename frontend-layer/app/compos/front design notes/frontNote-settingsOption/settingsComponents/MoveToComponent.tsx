import React, {Fragment, ReactElement, useContext, useRef} from "react";
import './moveToComponentStyling.css'

// Imported Icons
import CloseIcon from '@/public/icons/notesIcons/close-line.svg';
import Image from "next/image";

import FoldersStateManagerContext from "@/app/wideStateManagement/FoldersState";
import FolderTransferIcon from "@/public/icons/frontNoteSetting-icons/folder-transfer-line.svg";

export default function MoveToComponent(): ReactElement | null {
    const moveToButtonRef = useRef<HTMLDialogElement>(null);

    const cntx = useContext(FoldersStateManagerContext);

    const handleDialogOpening = (): void => {
        const isModalOpen = moveToButtonRef.current;

        if (!isModalOpen?.open) {
            moveToButtonRef.current?.showModal();
        } else {
            moveToButtonRef.current?.close();
        }
    };

    return (
        <Fragment>
            <li onClick={handleDialogOpening}><Image src={FolderTransferIcon} width={20} alt="moveNote"/>Move to</li>

            <dialog ref={moveToButtonRef} className="MoveToContainer" onClick={(e) => e.stopPropagation()}>
                <div className="dialogContainer">
                    <Image src={CloseIcon} alt="closeThisM odal" onClick={() => moveToButtonRef.current?.close()} />

                    <div className="ModalInstructions">
                        <h1>Move this Notecard to:</h1>
                        <p>A single Notecard can have multiple tags.</p>
                    </div>
                    <hr style={{margin: '20px 0'}}/>
                    <div className="tagsContainer">
                        <ul>
                            {cntx.map((tag, index) => (
                                <li key={index}>#{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </dialog>
        </Fragment>
    )
}
