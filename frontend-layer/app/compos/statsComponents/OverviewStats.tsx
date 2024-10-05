'use client'

import {ReactElement, useState} from "react";
import Image from "next/image";
import './statsComponentsStyling.css'

import LeftToIcon from '@/public/icons/leftTo.svg'
import RightToIcon from '@/public/icons/rightTo.svg'
import ShareStatsIcon from "@/app/compos/statsComponents/share-statsIcon-component/ShareStatsIcon";

type PeriodStatType = 'weekly' | 'monthly' | 'yearly';
const periodStats: PeriodStatType[] = ['weekly', 'monthly', 'yearly'];

interface overviewStatsProps_interface {
    typeOfStatsContent: string;
    statsResult: number
}

export default function OverviewStats({typeOfStatsContent, statsResult}: overviewStatsProps_interface): ReactElement {
    const [isStatAvailable, setIsStatAvailable] = useState<boolean>(true)
    const [periodStat, setPeriodStat] = useState<PeriodStatType>(periodStats[0]);

    // Helper function to switch between period stats based on the index
    const handlePeriodSwitch = () => {
        const currentIndex = periodStats.indexOf(periodStat);
        const nextIndex = (currentIndex + 1) % periodStats.length; // Cycle back to 0 when reaching the end
        setPeriodStat(periodStats[nextIndex]);
    };


    return <div className="simpleOverviewLayer">

        <div className="periodSwitch_shareButton">
            <div className="statsPeriodSwitching">
                <span className="backTo"><Image src={LeftToIcon} alt="goBackTo"/></span>
                <button className="periodSwitch" onClick={handlePeriodSwitch}>
                    {periodStat}
                </button>
                <span className="forwardTo"><Image src={RightToIcon} alt="goForwardsTo"/></span>
            </div>
            <ShareStatsIcon/>
        </div>

        {isStatAvailable ? <div className="typeOfStat_statResult">
            {typeOfStatsContent}: <span className="booksRead">{statsResult}</span>
        </div> : 'Stats are not available'}
    </div>
}