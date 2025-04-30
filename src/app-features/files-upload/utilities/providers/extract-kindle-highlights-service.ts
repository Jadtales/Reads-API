import { HighlightsInterface } from '../../interfaces/highlights-interface';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtractKindleHighlightsServiceUtil {
  public extractKindleHighlights(kindleFileContent: string): {
    highlights: HighlightsInterface[];
    exceptions: string[];
  } {
    const notesSeparator = '=========='; // separator
    const normalizedContent = kindleFileContent.replace(
      /\s*={10,}\s*/g,
      notesSeparator,
    ); // Normalize separators
    const noteCardsArray = normalizedContent.split(notesSeparator); // Split by the separator

    const highlights: HighlightsInterface[] = [];
    let exceptions: string[] = [];

    for (const highlight of noteCardsArray) {
      if (!highlight.trim()) {
        continue; // Skip empty blocks
      }

      const lines = highlight.trim().split('\n');

      if (lines.length < 3) {
        exceptions.push(`Skipped due to insufficient lines: ${lines}`);
        continue; // Skip if there are fewer than 3 lines
      }

      // Extract book title and author
      const bookInfo = lines[0].trim();
      const bookNameMatch =
        bookInfo.match(/^(.+?) \(([^)]+)\)$/) ||
        bookInfo.match(/^(.+?) (?:by ([^(]+))? \(([^)]+)\)$/i); // Match title and author
      if (!bookNameMatch) {
        console.warn('Skipped due to unmatched book info:', bookInfo);
        continue; // Skip if the title and author pattern doesn't match
      }

      const bookTitle = bookNameMatch[1]
        .substring(0, bookNameMatch[1].indexOf('('))
        .trim();
      const bookAuthor = bookNameMatch[2].trim();

      // Extract metadata (location and added date)
      const metadata = lines[1].trim();
      const locationMatch = metadata.match(
        /Location (\d+(?:-\d+)?) \| Added on (.+)$/,
      );
      if (!locationMatch) {
        exceptions.push(`Skipped due to unmatched metadata:", ${metadata}`);
        continue; // Skip if location and date format doesn't match
      }

      const pageLocation = locationMatch[1].trim();
      const addedDate = locationMatch[2].trim();

      // Extract highlight text (lines after metadata)
      const highlightText = lines.slice(2).join(' ').trim();
      if (!highlightText) {
        exceptions.push(
          `Skipped due to empty highlight text: ${highlightText}`,
        );
        continue; // Skip if highlight text is empty
      }

      // Find or create a book entry
      let book = highlights.find(
        (n) => n.bookTitle === bookTitle && n.bookAuthor === bookAuthor,
      );

      if (!book) {
        book = {
          bookId: uuid(),
          bookTitle,
          bookAuthor,
          highlights: [],
          lastTimeViewed: 0,
          contentSource: 'Kindle',
          learningProcess: 'Not started',
          genres: [],
          pageLocation,
          addedDate,
          isNotecardPinned: false,
        };
        highlights.push(book);
      }

      // Add highlight
      book.highlights.push({
        highlightKey: book.highlights.length + 1, // Unique key
        description: highlightText,
        isHighlightPinned: false,
        isStared: false,
      });
    }

    return {
      highlights: highlights,
      exceptions: exceptions,
    };
  }
}
