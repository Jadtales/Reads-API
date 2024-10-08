'use client';

import {Fragment, ReactElement, useState} from "react";
import './browsePage-styling.css';
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";


export default function BrowsePage(): ReactElement {

    const [searchValue, setSearchValue] = useState<string>("");


    return (
        <Fragment>

            {searchValue.length > 0 ? (
                <div className="browsePage-searching">
                    <div className="searchedHighlights">
                        <h1>Searched highlights.</h1>
                        <div className="searchedHighlights-components">

                        </div>
                    </div>

                    <div className="searchedPeople">
                        <h1>Searched people.</h1>

                        <div className="searchedPeople-profiles">

                        </div>
                    </div>
                </div>
            ) : (
                <div className="browsePage">
                    <div className="recommendationsBasedOnFlavour-section">
                        <h1>Daily recommendations based on your flavour.</h1>
                        <div className="recommendationsBasedOnFlavour">
                            <FrontDesignNoteBrowse
                                bookTitle={'There there'}
                                bookAuthor={'Tommy Orange'}
                                notedByUsername={'jadtales'}
                            />
                            {/* Repeat as needed */}
                        </div>

                    </div>

                    <div className="popularNotes-section">
                        <h1>Weekly Popular notes.</h1>
                        <div className="popularNotes">
                            <FrontDesignNoteBrowse
                                bookTitle={'There there'}
                                bookAuthor={'Tommy Orange'}
                                notedByUsername={'jadtales'}
                            />
                            {/* Repeat as needed */}
                        </div>
                    </div>

                    <div className="popularByGenre-section">
                        <h1>Popular notes by genre.</h1>
                        <div className="popularByGenre">
                            <FrontDesignNoteBrowse
                                bookTitle={'There there'}
                                bookAuthor={'Tommy Orange'}
                                notedByUsername={'jadtales'}
                            />
                            {/* Repeat as needed */}
                        </div>
                    </div>

                    <div className="goodreadsAnnouncement-section">
                        <h1>Goodreads Announcements.</h1>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
