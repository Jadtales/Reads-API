import HighlightsInterface from "@/utils/interfaces/HighlightsInterface";

export default interface NoteCardInterface extends HighlightsInterface{
    bookId: number;
    bookTags?:  string;
}