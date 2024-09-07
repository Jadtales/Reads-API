'use client'

import React, {ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";
import "./navbarStyling.css"
import {stdIconStyling} from "@/app/globals.css"

import RightArrowIcon from "@/public/icons/rightarrow.svg";
import SearchIcon from "@/public/icons/search-2-line.svg"
import SettingsIcon from "@/public/icons/settings-4-line.svg"
import NotificationsIcon from "@/public/icons/notification-line.svg"
import ReportBugsIcon from "@/public/icons/error-warning-line.svg"

export default function Navbar(): ReactElement {
    const [isUserProfileClicked, setIsUserProfileClicked] = useState<boolean>(false)
    const [isSearchInputClicked, setIsSearchInputClicked] = useState<boolean>(false)

    const searchInputFieldRef = useRef<HTMLInputElement>(null)

    const handleUserProfileClicked = (): void => {
        setIsUserProfileClicked(!isUserProfileClicked);
    }

    const handleSearchInputClicked = (): void => {
        setIsSearchInputClicked(!isSearchInputClicked);
    }

    useEffect((): void => {
        // Focus the input when search button is active
        if (isSearchInputClicked && searchInputFieldRef.current) {
            searchInputFieldRef.current.focus();
        }


    }, [isSearchInputClicked]);

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

                    <div className={isSearchInputClicked ? "searchButton-active" : 'searchButton'}>
                        <Image src={SearchIcon} alt="expandProfileSettings" onClick={handleSearchInputClicked}/>
                        <input type="search" placeholder="Search for highlights, poeple."
                               ref={searchInputFieldRef}/>
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