import {ReactElement} from "react";
import './statsPageStyling.css'

import OverviewStats from "@/app/compos/statsComponents/OverviewStats";

export default function StatsPage(): ReactElement {
    return (
        <div className="statsPageContainer">

            <div className="userOverviewStats">
                <h1>Basic reading metrics</h1>
                <div className="statsResult">
                    <OverviewStats typeOfStatsContent={'Books read'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Pages read'} statsResult={232}/>
                    <OverviewStats typeOfStatsContent={'Reviewed cards'} statsResult={232}/>
                </div>
            </div>

        </div>
    )
}