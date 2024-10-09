/*
* --- kindle highlights structure ---
* 1- the name of the book is at the top followed by the name of the author in parentheses.
* 2- the highlight location in the book & the date was added on is in the second line after the book title
*   (and starts with '-').
* 3- at the end, there exists the saved highlight.
* 4- each highlight is separated by a separator of 10 '=' sign
* */
import {randomUUID} from "node:crypto";

interface highlights_interface {
    highlight_location_page: string;
    added_highlight_date: string;
    highlight: string;
}

interface bookNotes_interface {
    bookName: string;
    authorName: string;
    id: string;
    bookHighlights: highlights_interface[];
}

const notesSeparator: string = '='.repeat(10); // todo: it's better to check the separator dynamically (because amazon might change it in the future)

export default function arrangeKindleNotes(clippings: string): bookNotes_interface[] {

    const notesArray: string[] = clippings.split(notesSeparator)

    const notes: bookNotes_interface[] = [];

    // skip any empty or whitespace-only clippings
    for (const clipping of notesArray) {
        if (!clipping.trim()) {
            continue;
        }

        const lines = clipping.trim().split('\n').map(line => line.trim());

        if (lines.length < 3) {
            continue; // Skip if the clipping doesn't have enough lines
        }

        // Extracting book title and author name
        const bookInfo = lines[0];
        const bookNameMatch = bookInfo.match(/^(.+?) \(([^)]+)\)/);
        if (!bookNameMatch) {
            continue; // Skip if the book name and author pattern is not matched
        }

        const bookName = bookNameMatch[1].trim();
        const authorName = bookNameMatch[2].trim();

        // Extract the highlight location and date added
        const metadata = lines[1];
        const locationMatch = metadata.match(/Location (\d+-\d+) \| Added on (.+)$/);
        if (!locationMatch) {
            continue; // Skip if location and date added pattern is not matched
        }

        const highlightLocationPage = locationMatch[1].trim();
        const addedHighlightDate = locationMatch[2].trim();

        // Extract the highlight text itself
        const highlight = lines.slice(2).join('\n').trim();

        // Construct the front design createnotes object
        const note: highlights_interface = {
            highlight_location_page: highlightLocationPage,
            added_highlight_date: addedHighlightDate,
            highlight,
        };

        // Find if the book is already in the createnotes array
        let book = notes.find(n => n.bookName === bookName && n.authorName === authorName);

        if (!book) {
            // If the book is not found, create a new entry
            book = {
                bookName,
                authorName,
                id: `${(bookName[0]+authorName[0])}-${randomUUID()}`,
                bookHighlights: [],
            };
            notes.push(book);
        }

        // adding the front design createnotes to the book's createnotes array
        book.bookHighlights.push(note);
    }

    return notes;

}

