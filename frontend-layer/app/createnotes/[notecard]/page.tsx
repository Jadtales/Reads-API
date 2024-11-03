'use client'

import {ChangeEvent, Fragment, ReactElement, useState} from "react";
import './createNotesPageStyling.css';

import NotesCreationButtons from "@/app/compos/notesCreationComponents/topLayerComponents/NotesCreationButtons";
import NotesDescriptionAndTitleComponent from "@/app/compos/notesCreationComponents/topLayerComponents/NotesDescriptionAndTitleComponent";
import NoteCard from "@/app/compos/notesCreationComponents/topLayerComponents/NoteCard";
import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import SubModalComponent from "@/app/compos/subscriptionModal/SubModalComponent";

interface NoteCardData {
    cardKey: number;
    cardTitle: string;
    cardDefinition: string;
}

export default function Notes(): ReactElement {
    const [noteCards, setNoteCards] = useState<NoteCardData[]>([
        {
            cardKey: 1,
            cardTitle: 'Chapter number/name',
            cardDefinition: 'Your highlights/notes on the chapter',
        }
    ]);

    const [newCardsToAdd, setNewCardsToAdd] = useState<number>(1);
    const [isSubModalOpen, setIsSubModalOpen] = useState<boolean>(false);

    // Function to handle adding new cards
    const addNewCards = (): void => {
        if (noteCards.length + newCardsToAdd > 4) {
            return setIsSubModalOpen(true); // Open modal if user exceeds limit
        }

        const newCards = Array.from({ length: newCardsToAdd }, (_, index) => ({
            cardKey: noteCards.length + index + 1,
            cardTitle: `Chapter number/name`,
            cardDefinition: `Your highlights/notes on the chapter`,
        }));

        setNoteCards((prevCards) => [...prevCards, ...newCards]);
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
    };

    // Function to close the modal
    const closeSubModal = (): void => {
        setIsSubModalOpen(false); // Close modal
    };

    // Handle changes to how many cards to add
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setNewCardsToAdd(Math.max(1, Math.min(value, 4)));
    };

    const handleDeleteCard = (key: number): void => {
        const updatedCards = noteCards.filter((card) => card.cardKey !== key);
        const reorderedCards = updatedCards.map((card, index) => ({
            ...card,
            cardKey: index + 1
        }));
        setNoteCards(reorderedCards);
    };

    return (
        <Fragment>
            <GoBackToComponent />
            <div className="createNotesComponent">
                <NotesCreationButtons />
                <NotesDescriptionAndTitleComponent />

                {noteCards.map((card) => (
                    <NoteCard
                        key={card.cardKey}
                        cardKey={card.cardKey}
                        cardTitle={card.cardTitle}
                        cardDefinition={card.cardDefinition}
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
                        max={4}
                        min={1}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Render the modal if the user tries to add more than 4 cards */}
            {noteCards.length === 4 && isSubModalOpen && (
                <SubModalComponent onSubModalClose={closeSubModal} />
            )}
        </Fragment>
    );
}
