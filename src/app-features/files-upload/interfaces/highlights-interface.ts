export interface HighlightsInterface {
    bookId: string;
    bookAuthor: string;
    bookTitle: string;
    pageLocation: string;
    addedDate: string;
    bookCoverURL?: string;

    isNotecardPinned: boolean;
    lastTimeViewed: number;
    contentSource: string;
    learningProcess: string;
    genres: string[];

    highlights: {
        highlightKey: number;
        term?: string | null;
        description: string | null;
        isStared: boolean;
        isHighlightPinned: boolean;
    }[];

    exceptions?: string[];
};