interface highlightsInterface {
    bookAuthor: string;
    bookTitle: string;
    pageLocation?: string;
    addedDate?: string;
    highlights: {
        highlightKey: number;
        highlightText: string;
    }[];
}

export function arrangeKindleNotes(content: string): highlightsInterface[] {
    const notesSeparator = "=========="; // The expected separator
    const normalizedContent = content.replace(/\s*={10,}\s*/g, notesSeparator); // Normalize separators
    const noteCardsArray = normalizedContent.split(notesSeparator); // Split by the separator
    const notes: highlightsInterface[] = [];


    for (const highlight of noteCardsArray) {
        if (!highlight.trim()) {
            continue; // Skip empty blocks
        }

        const lines = highlight.trim().split("\n");

        if (lines.length < 3) {
            console.warn("Skipped due to insufficient lines:", lines);
            continue; // Skip if there are fewer than 3 lines
        }

        // Extract book title and author
        const bookInfo = lines[0].trim();
        const bookNameMatch = bookInfo.match(/^(.+?) \(([^)]+)\)$/) || bookInfo.match(/^(.+?) (?:by ([^(]+))? \(([^)]+)\)$/i); // Match title and author
        if (!bookNameMatch) {
            console.warn("Skipped due to unmatched book info:", bookInfo);
            continue; // Skip if the title and author pattern doesn't match
        }

        const bookTitle = bookNameMatch[1].substring(0, bookNameMatch[1].indexOf('(')).trim();
        const bookAuthor = bookNameMatch[2].trim();

        // Extract metadata (location and added date)
        const metadata = lines[1].trim();
        const locationMatch = metadata.match(/Location (\d+-\d+) \| Added on (.+)$/);
        if (!locationMatch) {
            console.warn("Skipped due to unmatched metadata:", metadata);
            continue; // Skip if location and date format doesn't match
        }

        const pageLocation = locationMatch[1].trim();
        const addedDate = locationMatch[2].trim();

        // Extract highlight text (lines after metadata)
        const highlightText = lines.slice(2).join(" ").trim();
        if (!highlightText) {
            console.warn("Skipped due to empty highlight text.");
            continue; // Skip if highlight text is empty
        }

        // Find or create a book entry
        let book = notes.find(
            (n) => n.bookTitle === bookTitle && n.bookAuthor === bookAuthor
        );

        if (!book) {
            book = {
                bookTitle,
                bookAuthor,
                highlights: [],
            };
            notes.push(book);
        }

        // Add highlight
        book.highlights.push({
            highlightKey: book.highlights.length + 1, // Unique key
            highlightText,
        });
    }

    return notes;
}
