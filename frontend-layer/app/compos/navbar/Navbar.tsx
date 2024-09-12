'use client'

import React, {ReactElement, useState} from "react";
import Image from "next/image";
import "./navbarStyling.css"
import {useRouter} from "next/navigation";

import RightArrowIcon from "@/public/icons/rightarrow.svg";
import SearchIcon from "@/public/icons/search-2-line.svg"
import SettingsIcon from "@/public/icons/settings-4-line.svg"
import NotificationsIcon from "@/public/icons/notification-line.svg"
import ReportBugsIcon from "@/public/icons/error-warning-line.svg"

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
                <span>RN</span>

                <div className="user-search_buttons">
                    <div className={isUserProfileClicked ? 'userProfile-active' : 'userProfile'}
                         onClick={handleUserProfileClicked}>
                        {/*<Image src={} alt={}/>*/}
                        <h1 id="userUsername">Jadtales</h1>

                        <div className={isUserProfileClicked ? 'userButtons-active' : 'userButtons'}>
                            <button>Log out</button>
                            <button>Private</button>
                        </div>

                        <Image src={RightArrowIcon} alt="expendUserSettings"/>
                    </div>

                    <div className="searchButton-active">
                        <Image src={SearchIcon} alt="expandProfileSettings"/>
                        <input type="search" placeholder="Search for highlights, poeple." onClick={() => handleOpenBrowsePage()}/>
                    </div>
                </div>
            </div>


            <div className="userInteractionButtons">
                <button className="stdIconStyling">
                    <Image src={SettingsIcon} alt="settingIcon"/>
                </button>
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