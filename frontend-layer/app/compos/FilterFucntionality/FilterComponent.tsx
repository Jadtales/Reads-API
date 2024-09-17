import React, {ReactElement} from "react";

import './filterCompoStyling.css'

export default function FilterComponent(): ReactElement {

    return (
        <div className="filtering-section">
            <div className="filter-books">
                <h2>Filter books</h2>

                <div className="filter-books-options">
                    <div className="basedOnGenre">
                        <input type="text" placeholder="Genre"/>
                    </div>
                </div>
            </div>

            <div className="filter-notes">
                <h2>Filter Notes</h2>

                <div className="filter-notes-options">
                    <div className="completionStatus">
                        <span>Mastered</span>
                        <span>In progress</span>
                        <span>No Started</span>
                    </div>

                    <hr style={{margin: '5px 0'}}/>

                    <div className="isWithNotes">
                        <span>With notes</span>
                    </div>
                </div>
            </div>

            <div className="filter-timing">
                <h2>Filter Timing</h2>

                <div className="lastAccessedStatus">
                    <span>Recently viewed</span>
                    <span>Since last week</span>
                    <span>Since last month</span>
                </div>

                <hr style={{margin: '5px 0'}}/>

                <div className="addedDate">
                    <span>Today</span>
                    <span>Past week</span>
                    <span>Past month</span>
                </div>
            </div>

            <div className="filter-typeOfContent">
                <h2>Filter Content</h2>

                <div className="filter-typeOfContent-options">
                    <span className="contentSource">Kindle highlights</span>
                    <span className="contentSource">Goodreads highlights</span>
                    <span className="contentSource">Twitter highlights</span>
                </div>

            </div>
        </div>
    )
}