'use client'
import {ReactElement} from "react";
import './statsPageStyling.css'

import OverviewStats from "@/app/compos/statsComponents/OverviewStats";

import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";
import ShareStatsModal from "@/app/compos/statsComponents/share-statsIcon-component/ShareStatsModal";
import HeatMapComponent from "@/app/compos/statsComponents/heatMapComponent/HeatMapComponent";

const test = {
    bookCover: OverviewStats
}
export default function StatsPage(): ReactElement<any> {
    return (
        <div className="statsPageContainer">

            <div className="userOverviewStats">
                <h2>Basic reading metrics</h2>
                <div className="statsResult">
                    <OverviewStats typeOfStatsContent={'Books read'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Pages read'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Reviewed cards'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Readnotes Ranking'} statsResult={99}/>
                    <OverviewStats typeOfStatsContent={'Average Rating'} statsResult={99}/>
                    <OverviewStats typeOfStatsContent={'Most Viewed Genre'} statsResult={99}/>
                </div>
            </div>

            <div className="dailyReviews">
                <h2>Daily reviews</h2>
                <HeatMapComponent/>
            </div>

            <div className="mostViewedBooks">
                <div className="header">
                    <h2>Most viewed Books/Notecards</h2>
                    <ShareStatsModal whoShared={'Jadtales'}
                                     sharedTypeOfContent={'Most viewed Books/Notecards'}
                                     sharedContent={'e'}/>
                </div>
                <div className="statsResult">
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'Jadtales'}/>
                    <FrontDesignNoteBrowse bookTitle={'There, there'}
                                           bookAuthor={'Tommy Orange'}
                                           notedByUsername={'Jadtales'}/>

                </div>
            </div>

        </div>
    )
}