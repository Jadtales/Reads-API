import React, {Fragment, ReactElement, useRef, useState} from "react";
import Image from "next/image";
import "./selectedNoteCards-highlightsModal-Styling.css";

import CloseIcon from "@/public/icons/notesIcons/close-line.svg";
import KindleDeviceIcon from "@/public/icons/tablet-line.svg";

import SelectedNotecardComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/kindle/kindleHighlightsComponents/SelectedNotecard";
import {arrangeKindleNotes} from "@/utils/providers/kindleClippingsExtractor";

import NoteCardInterface from "@/utils/interfaces/NoteCardInterace";

interface ComponentProps {
    buttonBackGroundColor?: string;
    buttonPadding?: string;
    buttonBorderRadius: string;
    buttonBorder?: string;
    buttonTextColor?: string;
    newSelectedKindleHighlights: (selectedHighlights: Set<NoteCardInterface>) => void;
}

export default function KindleHighlightsSelectionComponent({
                                                               buttonBackGroundColor,
                                                               buttonPadding,
                                                               buttonBorderRadius,
                                                               buttonTextColor,
                                                               buttonBorder,
                                                               newSelectedKindleHighlights
                                                           }: ComponentProps): ReactElement<any> {

    const [highlights, setHighlights] = useState<NoteCardInterface[]>(); // Adjust type to match your use case
    const [selectedHighlights, setSelectedHighlights] = useState<Set<NoteCardInterface>>(new Set());

    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    const handleDialogDisplaying = (): void => {
        const modal = modalRef.current;

        if (!modal?.open) {
            modal?.showModal();
        } else {
            setSelectedHighlights(new Set());
            modal?.close();
        }
    }

    const handleFileFiltering = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];

            const fileText = await selectedFile.text();

            const parsedHighlights = arrangeKindleNotes(fileText);

            if (parsedHighlights) {
                handleDialogDisplaying();
                setHighlights(parsedHighlights);
            }
        }
        event.target.value = '';
    };

    const initInputOpen = (): void => {
        inputRef.current?.click(); // Trigger file input click
    };

    // get selected highlights
    const handleSelectedHighlights = (highlights: NoteCardInterface): void => {
        setSelectedHighlights(prev => {
            const newSelected = new Set(prev);
            const doesHighlightExist = newSelected.has(highlights)

            if (doesHighlightExist) {
                newSelected.delete(highlights);
            } else {
                newSelected.add(highlights);
            }

            return newSelected;
        });
    }

    // import selected highlights
    const handleNotecardsImport = (): void => {
        newSelectedKindleHighlights(selectedHighlights)

        handleDialogDisplaying();
    }

    return <>
        <button onClick={initInputOpen} className={'importKindleHighlightsButton'} style={{
            backgroundColor: buttonBackGroundColor ? buttonBackGroundColor : 'black',
            padding: buttonPadding,
            borderRadius: buttonBorderRadius,
            border: buttonBorder,
            color: buttonTextColor,
            display: 'flex',
            cursor: 'pointer',
            outline: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
        }}>
            <Image src={KindleDeviceIcon} width={20} alt="kindle"/> Kindle
        </button>

        <input
            type="file"
            ref={inputRef}
            onChange={handleFileFiltering}
            style={{display: "none"}}
        />

        <dialog className="KindleHighlightsSelectionContainer" ref={modalRef}>
            <div className="dialogContent">
                <div className="topCompoLayer">
                    <div className="typeOfSelection">
                        <button>Select All</button>
                        <button>Cancel</button>
                    </div>
                    <Image src={CloseIcon} alt="closeModal" onClick={handleDialogDisplaying}/>
                </div>

                <hr style={{width: "100%"}}/>

                <button className="FinalImportButton" onClick={handleNotecardsImport}>Import</button>

                {highlights?.length === 0 ? (
                    <p className="filesLoader">No highlights found in the file.</p>
                ) : (

                    <Fragment>
                        <h2>Select your highlights to be imported</h2>

                        <div className="noteCards">
                            {highlights?.map((highlightObj, index) => (
                                <SelectedNotecardComponent
                                    key={index}
                                    bookTitle={highlightObj.bookTitle}
                                    bookAuthor={highlightObj.bookAuthor}
                                    highlightsQuantity={highlightObj.highlights.length}
                                    onSelect={() => handleSelectedHighlights(highlightObj)}
                                    isNotecardSelected={selectedHighlights.has(highlightObj)}
                                />
                            ))}
                        </div>
                    </Fragment>
                )}
            </div>
        </dialog>
    </>
}