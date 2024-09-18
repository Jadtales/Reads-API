'use client'

import React, {ReactElement, useState} from "react";
import Image from "next/image";
import "./navbarStyling.css"
import {useRouter} from "next/navigation";

import RightArrowIcon from "@/public/icons/rightarrow.svg";
import SearchIcon from "@/public/icons/search-2-line.svg"
import NotificationsIcon from "@/public/icons/notification-line.svg"
import ReportBugsIcon from "@/public/icons/error-warning-line.svg"

import RNICON from "@/public/RN-icon.png"
import Link from "next/link";

export default function Navbar(): ReactElement {
    const [isUserProfileClicked, setIsUserProfileClicked] = useState<boolean>(false)

    const router = useRouter()

    // const searchInputFieldRef = useRef<HTMLInputElement>(null)

    const handleUserProfileClicked = (): void => {
        setIsUserProfileClicked(!isUserProfileClicked);
    }


    const handleOpenBrowsePage = (): void => {
        router.push('/browse')
    }

    return (
        <nav id="navbarContainer">
            <div className="iconContainer">
                <Image id="reanotesIcon" src={RNICON} alt="reanotes" width={50}/>

                <div className="user-search_buttons">
                    <div className={isUserProfileClicked ? 'userProfile-active' : 'userProfile'}
                         onClick={handleUserProfileClicked}>
                        <Image src={RNICON} alt="userProfileImg" width={20} style={{
                            borderRadius: '50%'
                        }}/>
                        <h1 id="userUsername">Jadtales</h1>

                        <div className={isUserProfileClicked ? 'userButtons-active' : 'userButtons'}>
                            <Link href={`/settings`}>Settings</Link>
                            <button>Log out</button>
                        </div>

                        <Image src={RightArrowIcon} alt="expendUserSettings"/>
                    </div>

                    <div className="searchButton-active">
                        <Image src={SearchIcon} alt="expandProfileSettings"/>
                        <input type="search" placeholder="Search for highlights, poeple."
                               onClick={() => handleOpenBrowsePage()}/>
                    </div>
                </div>
            </div>


            <div className="userInteractionButtons">
                <button className="stdIconStyling">
                    <Image src={NotificationsIcon} alt="settingIcon"/>
                </button>
                <button className="stdIconStyling">
                    <Image src={ReportBugsIcon} alt="settingIcon"/>
                </button>
            </div>
        </nav>
    )

}