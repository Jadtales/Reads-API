'use client';

import {Fragment, ReactElement} from "react";
import './browsePage-styling.css';
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";
import {useSearchContext} from "@/utils/providers/searchInputFieldProvider";

export default function BrowsePage(): ReactElement<any> {

    const {userSearchedText} = useSearchContext()

    return (
        <Fragment>
            {userSearchedText.length > 0 ? (

                <div className="browsePage-searching">
                    <div className="searchedHighlights">
                        <h2>Searched highlights.</h2>

                        <div className="searchedHighlights-components">
                            {userSearchedText}
                        </div>
                    </div>

                    <div className="searchedPeople">
                        <h2>Searched people.</h2>

                        <div className="searchedPeople-profiles">
                            {userSearchedText}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="browsePage">
                    <div className="recommendationsBasedOnFlavour-section">
                        <h2>Daily recommendations based on your flavour.</h2>
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
                        <h2>Weekly Popular notes.</h2>
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
                        <h2>Popular notes by genre.</h2>
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
                        <h2>Goodreads Announcements.</h2>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
