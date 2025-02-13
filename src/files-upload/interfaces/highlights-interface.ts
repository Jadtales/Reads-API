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
        term?: string | null;
        description: string | null;
        highlightKey: number;
        isStared: boolean;
        isHighlightPinned: boolean;
    }[];

    exceptions?: string[];
};