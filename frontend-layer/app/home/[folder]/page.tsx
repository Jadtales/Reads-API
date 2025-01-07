'use client'

import React, {ReactElement, useState} from "react";
import {useRouter} from 'nextjs-toploader/app';
import './notesGrid.css'

import FolderComponent from "@/app/compos/foldersComponent/FolderComponent";
import FrontNoteComponent from "@/app/compos/front design notes/FrontNoteComponent";
import FoldersStateManagerContext from "@/app/wideStateManagement/FoldersState";
import Welcoming from "@/app/compos/welcomingComponent/WelcomingComponent";
import NoteCardInterface from "@/utils/interfaces/NoteCardInterace";

let noteData = [
    {bookAuthor: 'Tommy Orange', bookTitle: 'There, there', bookId: 1, bookTags: 'Poetry'},
    {bookAuthor: 'George Orwell', bookTitle: '1984', bookId: 2, bookTags: 'Dystopian'},
    {bookAuthor: 'Harper Lee', bookTitle: 'To Kill a Mockingbird', bookId: 3, bookTags: 'Classic'},
    {bookAuthor: 'J.K. Rowling', bookTitle: 'Harry Potter', bookId: 4, bookTags: 'Fantasy'},
    {bookAuthor: 'F. Scott Fitzgerald', bookTitle: 'The Great Gatsby', bookId: 5, bookTags: 'Classic'},
    {bookAuthor: 'Herman Melville', bookTitle: 'Moby Dick', bookId: 6, bookTags: 'Adventure'},
    {bookAuthor: 'Jane Austen', bookTitle: 'Pride and Prejudice', bookId: 7, bookTags: 'Romance'},
    {bookAuthor: 'Mark Twain', bookTitle: 'Adventures of Huckleberry Finn', bookId: 8, bookTags: 'Adventure'},
    {bookAuthor: 'Leo Tolstoy', bookTitle: 'War and Peace', bookId: 9, bookTags: 'Historical'},
    {bookAuthor: 'George R.R. Martin', bookTitle: 'Game of Thrones', bookId: 10, bookTags: 'Fantasy'}
];

export const existedFolders: string[] = ['unspecified', 'poetry', 'fiction'];

export default function NoteCardsContainerHomePage(): ReactElement {
    const [noteCards, setNoteCards] = useState<NoteCardInterface[]>(noteData);

    const router = useRouter();
    const goToReviewMode = (bookTitle: string, bookId: number): void => {
        router.push(`/highlightsreview/${bookTitle.toLowerCase().replaceAll(' ', '-')}-${bookId}`);
    }

    const handleNotecardDeletion = (bookId: number, toCloseModalRef: any): void => {
        if (bookId && noteData.some(notecard => notecard.bookId === bookId)) {
            setNoteCards(noteCards.filter(noteCard => noteCard.bookId !== bookId));
            toCloseModalRef.current?.close()
        }
    };


    return (
        <FoldersStateManagerContext.Provider value={existedFolders}>
            <div className={'homePageContainer'}>

                <Welcoming username={'Jadtales'}/>

                <FolderComponent/>

                <div className="notes">
                    {noteCards.map((data, index: number) => (
                        <div key={index} onClick={() => goToReviewMode(data.bookTitle, data.bookId)}>

                            <FrontNoteComponent bookTitle={data.bookTitle}
                                                bookAuthor={data.bookAuthor}
                                                bookId={data.bookId}
                                                bookTags={data.bookTags}
                                                key={index}
                                                notecardDeletion={handleNotecardDeletion}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </FoldersStateManagerContext.Provider>
    )
}