import React, {Fragment, ReactElement, useState} from "react";
import './filterCompoStyling.css';
import Image from "next/image";
import filterIcon from "@/public/icons/filter-3-line.svg";

// list of genres
const bookGenres: string[] = [
    "Fiction",
    "Historical Fiction",
    "Non-fiction",
    "Philosophy",
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Thriller",
    "Mystery",
    "Horror",
    "Biography",
    "Self-help",
    "Young Adult",
    "Classics",
    "Poetry",
    "Dystopian",
    "Adventure",
    "Historical",
    "Contemporary",
    "Crime",
    "Political",
    "Religious/Spiritual",
    "Satire",
    "Western",
    "Urban Fantasy",
    "Literary Fiction"
]

export default function FilterComponent(): ReactElement {

    // State to track multiple active spans
    const [activeSpans, setActiveSpans] = useState<string[]>([]);

    // Function to toggle span activation
    const handleIsFilterOptionActive = (spanText: string): void => {
        if (activeSpans.includes(spanText)) {
            // If span is already active, remove it from the active list
            setActiveSpans(activeSpans.filter(active => active !== spanText));
        } else {
            // If span is not active, add it to the active list
            setActiveSpans([...activeSpans, spanText]);
        }
    };


    return <div className="filtering-section">

            <div className="filter-books">
                <h2>Filter Books</h2>

                <div className="filter-books-options">
                    <div className="basedOnGenre">
                        {bookGenres.map((genre) => (
                            <span
                                key={genre}
                                className={activeSpans.includes(genre) ? 'span-active' : ''}
                                onClick={() => handleIsFilterOptionActive(genre)}
                            >
                            {genre}
                          </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="filter-notes">
                <h2>Filter Notes</h2>

                <div className="filter-notes-options">
                    <div className="completionStatus">
                        {["Mastered", "In progress", "Not Started"].map((status) => (
                            <span
                                key={status}
                                className={activeSpans.includes(status) ? 'span-active' : ''}
                                onClick={() => handleIsFilterOptionActive(status)}
                            >
                                {status}
                            </span>
                        ))}
                    </div>

                    <hr style={{margin: '5px 0'}}/>

                    <div className="isWithNotes">
                        <span
                            className={activeSpans.includes("With createnotes") ? 'span-active' : ''}
                            onClick={() => handleIsFilterOptionActive("With createnotes")}
                        >
                            With notes
                        </span>
                    </div>
                </div>
            </div>

            <div className="filter-timing">
                <h2>Filter Timing</h2>

                <div className="lastAccessedStatus">
                    {["Recently viewed", "Since last week", "Since last month"].map((timing) => (
                        <span
                            key={timing}
                            className={activeSpans.includes(timing) ? 'span-active' : ''}
                            onClick={() => handleIsFilterOptionActive(timing)}
                        >
                            {timing}
                        </span>
                    ))}
                </div>

                <hr style={{margin: '5px 0'}}/>

                <div className="addedDate">
                    {["Today", "Past week", "Past month"].map((date) => (
                        <span
                            key={date}
                            className={activeSpans.includes(date) ? 'span-active' : ''}
                            onClick={() => handleIsFilterOptionActive(date)}
                        >
                            {date}
                        </span>
                    ))}
                </div>
            </div>

            <div className="filter-typeOfContent">
                <h2>Filter Content</h2>

                <div className="filter-typeOfContent-options">
                    {["Kindle highlights", "Goodreads highlights", "Twitter highlights"].map((content) => (
                        <span
                            key={content}
                            className={activeSpans.includes(content) ? 'span-active' : ''}
                            onClick={() => handleIsFilterOptionActive(content)}
                        >
                            {content}
                        </span>
                    ))}
                </div>
            </div>
        </div>
}
