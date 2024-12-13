'use client'

import {ChangeEvent, Fragment, ReactElement, useEffect, useState} from "react";
import './createNotesPageStyling.css';

import NotesCreationButtons from "@/app/compos/notesCreationComponents/topLayerComponents/NotesCreationButtons";
import NoteCard from "@/app/compos/notesCreationComponents/NoteCard";
import SubModalComponent from "@/app/compos/modals/subscriptionModal/SubModalComponent";
import NoteDescriptionAndTitleComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/NotesDescriptionAndTitleComponent";

interface NoteCardData {
    cardKey: number;
    cardTitle: string;
    cardDescription: string;
}

export default function Notes(): ReactElement {
    const {tagsElement, noteCardTags} = NoteDescriptionAndTitleComponent()
    const [noteCards, setNoteCards] = useState<NoteCardData[]>(
        Array.from({length: 4}, (_, index) => ({
            cardKey: index + 1,
            cardTitle: 'Chapter number/name',
            cardDescription: 'Your highlights/notes on the chapter'
        }))
    );


    const [newCardsToAdd, setNewCardsToAdd] = useState<number>(1);
    const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);

    // Function to handle adding new cards
    const addNewCards = (): void => {
        if (noteCards.length + newCardsToAdd > 10) {
            return setIsSubModalOpen(true); // Open modal if user exceeds limit
        }

        const newCards = Array.from({length: newCardsToAdd}, (_, index) => ({
            cardKey: noteCards.length + index + 1,
            cardTitle: `Chapter number/name`,
            cardDescription: `Your highlights/notes on the chapter`,
        }));

        setNoteCards((prevCards) => [...prevCards, ...newCards]);
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
    };

    // Function to close the modal
    const closeSubModal = (toClose: boolean): void => {
        setIsSubModalOpen(toClose); // Close modal
    };

    // Handle changes to how many cards to add
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setNewCardsToAdd(Math.max(1, Math.min(value, 4)));
    };

    const handleDeleteCard = (key: number): void => {
        if (noteCards.length >= 5) {
            const updatedCards = noteCards.filter((card) => card.cardKey !== key);
            const reorderedCards = updatedCards.map((card, index) => ({
                ...card,
                cardKey: index + 1
            }));
            setNoteCards(reorderedCards);
        }
    };

    // to prevent triggering browser default functionalities
    useEffect(() => {
        const handlePrinting = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', handlePrinting);

        return () => {
            document.removeEventListener('keydown', handlePrinting);
        };
    }, []);

    return (
        <Fragment>
            <div className="createNotesComponent">
                <NotesCreationButtons/>
                {tagsElement}

                {noteCards.map((card) => (
                    <NoteCard
                        key={card.cardKey}
                        cardKey={card.cardKey}
                        cardTitle={card.cardTitle}
                        cardDescription={card.cardDescription}
                        onDelete={handleDeleteCard}
                    />
                ))}

                <div className="cardFooterContainer">
                    <div className="addNewCardButton" onClick={addNewCards}>
                        + Add card(s)
                    </div>
                    <input
                        type="number"
                        defaultValue={1}
                        max={10}
                        min={4}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Render the modal if the user tries to add more than 4 cards */}
            {noteCards.length === 10 && isSubModalOpen && (
                <SubModalComponent/>
            )}
        </Fragment>
    );
}
