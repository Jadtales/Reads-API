import {ReactElement} from "react";
import './browsePage-styling.css'
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";


export default function BrowserPage(): ReactElement {
    return (
        <div className="browsePage">

            <div className="recommendationsBasedOnFlavour-section">
                <h1>Daily recommendations based on your flavour.</h1>

                <div className="recommendationsBasedOnFlavour">
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                </div>
            </div>

            <div className="pupolarNotes-section">
                <h1>Weekly Popular notes.</h1>

                <div className="popularNotes">
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>

                </div>
            </div>

            <div className="popularByGenre-section">
                <h1>Popular notes by genre.</h1>

                <div className="popularByGenre">
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'jadtales'}/>


                </div>
            </div>

            <div className="goodreadsAnnouncement-section">
                <h1>Goodreads Announcements.</h1>
            </div>


        </div>
    )
}