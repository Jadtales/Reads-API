import {ReactElement} from "react";
import Image from "next/image";
import './footerStyling.css'

import availableIcon from '@/public/icons/checkbox-circle-fill.svg'
import appleIcon from '@/public/icons/apple-fill.svg'
import androidIcon from '@/public/icons/android-fill.svg'
import RNICON from '@/public/RN-icon.png'

export default function Footer(): ReactElement {
    return (
        <footer>
            <div className="topLayer">
                <div className="readnotes-logo-name">
                    <Image id="reanotesIcon" src={RNICON} alt="readnotes" width={40}/>
                    <h1>Reanotes.</h1>
                </div>


                <div className="reanotesGeneralInfos-subscribed">
                    <h1>Import, discover, share and memorize notes.</h1>

                    <button className="tryReanotesButton">
                        Try Reanotes
                    </button>
                </div>
            </div>

            <hr style={{margin: '1% 0'}}/>

            <div className="bottomLayer">
                <div className="availableOnAllPlatforms-section">
                    <Image src={availableIcon} alt="available on all platforms"/>
                    Available everywhere to you.
                </div>

                <div className="availabilityPlatforms-section">
                    <button className="applePlatform">
                        <Image src={appleIcon} alt="apple availabiliy"/> Apple
                    </button>
                    <button className="androidPlatform">
                        <Image src={androidIcon} alt="android availabiliy"/> Android
                    </button>
                </div>
            </div>
        </footer>
    )
}