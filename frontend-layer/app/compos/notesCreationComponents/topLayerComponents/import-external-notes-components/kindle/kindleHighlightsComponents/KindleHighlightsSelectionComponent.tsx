import React, {Fragment, ReactElement, useEffect, useRef, useState} from "react";
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
                                                               newSelectedKindleHighlights,
                                                           }: ComponentProps): ReactElement<any> {
    const [highlights, setHighlights] = useState<NoteCardInterface[] | null>(null);
    const [selectedHighlights, setSelectedHighlights] = useState<Set<NoteCardInterface>>(new Set());
    const [fileError, setFileError] = useState<string | null>(null);

    const modalRef = useRef<HTMLDialogElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle dialog display
    const handleDialogDisplaying = (resetSelection: boolean = true): void => {
        const modal = modalRef.current;

        if (!modal?.open) {
            modal?.showModal();
        } else {
            if (resetSelection) setSelectedHighlights(new Set());
            modal?.close();
        }
    };

    // Handle file input and process highlights
    const handleFileFiltering = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];

            try {
                const fileText = await selectedFile.text();
                const parsedHighlights = arrangeKindleNotes(fileText);

                if (parsedHighlights && parsedHighlights.length > 0) {
                    setFileError(null); // Clear previous errors
                    setHighlights(parsedHighlights);
                    handleDialogDisplaying();
                } else {
                    setFileError("No valid highlights found in the file.");
                }
            } catch (error) {
                setFileError("Failed to parse the file. Please upload a valid file.");
                console.error("Error processing the file:", error);
            } finally {
                event.target.value = ''; // Clear input field
            }
        }
    };

    // Open the file input
    const initInputOpen = (): void => {
        inputRef.current?.click();
    };

    // Handle selection of individual highlights
    const handleSelectedHighlights = (highlight: NoteCardInterface): void => {
        setSelectedHighlights((prev) => {
            const newSelected = new Set(prev);
            const doesHighlightExist = newSelected.has(highlight);

            if (doesHighlightExist) {
                newSelected.delete(highlight);
            } else {
                newSelected.add(highlight);
            }

            return newSelected;
        });
    };

    // Handle importing selected highlights
    const handleNotecardsImport = (): void => {
        newSelectedKindleHighlights(selectedHighlights);
        handleDialogDisplaying();
    };

    // Fetch book covers based on selected highlights
    useEffect(() => {
        const fetchBookCovers = async () => {
            if (selectedHighlights.size === 0) return;

            const [chosenHighlight] = Array.from(selectedHighlights);

            if (!chosenHighlight || !chosenHighlight.bookTitle || !chosenHighlight.bookAuthor) return;

            const bookTitle = encodeURIComponent(chosenHighlight.bookTitle);
            const bookAuthor = encodeURIComponent(chosenHighlight.bookAuthor);

            console.log(bookTitle, bookAuthor)
            const query = `book_title=${bookTitle}&author_name=${bookAuthor}`;

            try {
                const response = await fetch(`https://bookcover.longitood.com/bookcover?${query}`);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

                const result = await response.json();

                // Update state immutably
                setSelectedHighlights((prevState) => {
                    return new Set(
                        Array.from(prevState).map((notecard) => {
                            if (
                                notecard.bookTitle === chosenHighlight.bookTitle &&
                                notecard.bookAuthor === chosenHighlight.bookAuthor
                            ) {
                                return {...notecard, bookCover: result.url};
                            }
                            return notecard;
                        })
                    );
                });
            } catch (error) {
                console.error("Error fetching book cover:", error);
            }
        };

        fetchBookCovers();
    }, [selectedHighlights.size]); // Only fetch when the size changes

    console.log(selectedHighlights)
    return (
        <>
            <button
                onClick={initInputOpen}
                className="importKindleHighlightsButton"
                style={{
                    backgroundColor: buttonBackGroundColor || "black",
                    padding: buttonPadding,
                    borderRadius: buttonBorderRadius,
                    border: buttonBorder,
                    color: buttonTextColor,
                    display: "flex",
                    cursor: "pointer",
                    outline: "none",
                    alignItems: "center",
                    marginBottom: '5px',
                    width: '100%',
                    justifyContent: "center",
                    gap: "5px",
                }}
            >
                <Image src={KindleDeviceIcon} width={20} alt="kindle"/> Kindle
            </button>

            <input type="file" ref={inputRef} onChange={handleFileFiltering} style={{display: "none"}}/>

            <dialog className="KindleHighlightsSelectionContainer" ref={modalRef}>
                <div className="dialogContent">
                    <div className="topCompoLayer">
                        <div className="typeOfSelection">
                            <button>Select All</button>
                            <button>Cancel</button>
                        </div>
                        <Image src={CloseIcon} alt="closeModal" onClick={() => handleDialogDisplaying(false)}/>
                    </div>

                    <hr style={{width: "100%"}}/>

                    <button className="FinalImportButton" onClick={handleNotecardsImport}>
                        Import
                    </button>

                    {fileError && <p className="error">{fileError}</p>}

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
    );
}
