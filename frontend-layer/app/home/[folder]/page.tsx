'use client';

import React, { ReactElement, useState, useEffect } from 'react';
import {usePathname} from "next/navigation";
import { useRouter } from 'nextjs-toploader/app';
import './notesGrid.css';

import Welcoming from '@/app/compos/welcomingComponent/WelcomingComponent';
import FolderComponent from '@/app/compos/foldersComponent/FolderComponent';
import FrontNoteComponent from '@/app/compos/front design notes/FrontNoteComponent';
import FoldersStateManagerContext from '@/app/wideStateManagement/FoldersState';
import AddNoteComponentButton from "@/app/compos/AddNoteButtonCompo/AddNoteButtonComponent";

import NoteCardInterface from '@/utils/interfaces/NoteCardInterace';

let noteData = [
    { bookAuthor: 'Tommy Orange', bookTitle: 'There, there', bookId: 1, bookTags: 'Poetry' },
    { bookAuthor: 'George Orwell', bookTitle: '1984', bookId: 2, bookTags: 'Dystopian' },
    { bookAuthor: 'Harper Lee', bookTitle: 'To Kill a Mockingbird', bookId: 3, bookTags: 'Classic' },
    { bookAuthor: 'J.K. Rowling', bookTitle: 'Harry Potter', bookId: 4, bookTags: 'Fantasy' },
    { bookAuthor: 'F. Scott Fitzgerald', bookTitle: 'The Great Gatsby', bookId: 5, bookTags: 'Classic' },
    { bookAuthor: 'Herman Melville', bookTitle: 'Moby Dick', bookId: 6, bookTags: ['Adventure', 'lol'] },
    { bookAuthor: 'Jane Austen', bookTitle: 'Pride and Prejudice', bookId: 7, bookTags: 'Romance' },
    { bookAuthor: 'Mark Twain', bookTitle: 'Adventures of Huckleberry Finn', bookId: 8, bookTags: 'Adventure' },
    { bookAuthor: 'Leo Tolstoy', bookTitle: 'War and Peace', bookId: 9, bookTags: 'Historical' },
    { bookAuthor: 'George R.R. Martin', bookTitle: 'Game of Thrones', bookId: 10, bookTags: 'Fantasy' }
];

export const existedFolders: string[] = ['all', 'poetry', 'fiction'];

export default function NoteCardsContainerHomePage(): ReactElement {
    const [noteCards, setNoteCards] = useState<NoteCardInterface[]>(noteData);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const tagName: string | undefined = pathname.split('/').pop(); // Extract the tag name from the URL

        const filteredNotecards = noteData.filter(notecard => {
            // If tagName is 'all' or undefined, return all notecards
            if (tagName === 'all' || !tagName) {
                return true;
            }

            // Normalize tagName to lowercase
            const normalizedTagName = tagName.toLowerCase();

            // Handle both string and array cases for bookTags
            if (Array.isArray(notecard.bookTags)) {
                // Check if any tag in the array ends with the normalized tagName
                return notecard.bookTags.some(tag => tag.toLowerCase().endsWith(normalizedTagName));
            } else {
                // Handle the case where bookTags is a string
                return notecard.bookTags.toLowerCase().endsWith(normalizedTagName);
            }
        });

        setNoteCards(filteredNotecards);
    }, [pathname]);

    const goToReviewMode = (bookTitle: string, bookId: number): void => {
        router.push(`/highlightsreview/${bookTitle.toLowerCase().replaceAll(' ', '-')}-${bookId}`);
    };

    const handleNotecardDeletion = (bookId: number, toCloseModalRef: any): void => {
        if (bookId && noteData.some(notecard => notecard.bookId === bookId)) {
            const updatedNotecards = noteCards.filter(noteCard => noteCard.bookId !== bookId);
            setNoteCards(updatedNotecards);
            toCloseModalRef.current?.close();
        }
    };

    const handleAddingNewKindleHighlights = (selectedHighlights: Set<NoteCardInterface>): void => {
        setNoteCards(prev => [
            ...prev,
            ...[...selectedHighlights].map(notecard => notecard)
        ]);
    }


    return (
        <FoldersStateManagerContext.Provider value={existedFolders}>
            <div className={'homePageContainer'}>s
                <Welcoming username={'Jadtales'} />
                <FolderComponent />
                <div className="notes">
                    {noteCards.map((notecard, index: number) => (
                        <div key={index} onClick={() => goToReviewMode(notecard.bookTitle, notecard.bookId)}>
                            <FrontNoteComponent
                                key={index}
                                bookTitle={notecard.bookTitle}
                                bookAuthor={notecard.bookAuthor}
                                bookId={notecard.bookId}
                                bookTags={notecard.bookTags!}
                                notecardDeletion={handleNotecardDeletion}
                            />
                        </div>
                    ))}
                </div>
                <AddNoteComponentButton getNewSelectedKindleHighlights={handleAddingNewKindleHighlights}/>
            </div>
        </FoldersStateManagerContext.Provider>
    );
}