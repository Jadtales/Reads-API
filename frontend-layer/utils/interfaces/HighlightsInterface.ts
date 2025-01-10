
export default interface HighlightsInterface{
    bookAuthor: string;
    bookTitle: string;
    pageLocation?: string;
    addedDate?: string;
    highlights: {
        highlightKey: number;
        highlightText: string;
    }[];
}