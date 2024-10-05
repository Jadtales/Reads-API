"use client";

import React, {ChangeEvent, ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import "./navbarStyling.css";

import RightArrowIcon from "@/public/icons/rightarrow.svg";
import SearchIcon from "@/public/icons/search-2-line.svg";
import NotificationsIcon from "@/public/icons/notification-line.svg";
import ReportBugsIcon from "@/public/icons/error-warning-line.svg";
import CollapseArrow from '@/public/icons/collapseArrow.svg';
import RNICON from "@/public/RN-icon.png";
import NotificationsComponent from "@/app/compos/navbar/notifications&reportBugsComponent/NotificationsComponent";
import ReportBugsComponent from "@/app/compos/navbar/notifications&reportBugsComponent/ReportBugsComponent";
import SubModalComponent from "@/app/compos/subscriptionModal/SubModalComponent";

export default function Navbar(): ReactElement {
    const [isUserProfileClicked, setIsUserProfileClicked] = useState<boolean>(false);
    const [userSearchQuery, setUserSearchQuery] = useState<string>(''); // Initial value is an empty string
    const [isNotifications_reportActive, setIsNotifications_reportActive] = useState<boolean>(false);
    const [clickedButton, setClickedButton] = useState<string>(''); // To track which button was clicked
    const [showModal, setShowModal] = useState<boolean>(false); // to close or open SubModal

    const router = useRouter();
    const notisCenterRef = useRef<HTMLDivElement>(null);

    const handleUserProfileClicked = (): void => {
        setIsUserProfileClicked(!isUserProfileClicked);
    };

    const handleOpenBrowsePage = (): void => {
        router.push('/browse');
    };

    const handleUserSearching = (searchInputField: ChangeEvent<HTMLInputElement>): void => {
        setUserSearchQuery(searchInputField.target.value); // Always keep this as a string
    };

    const handleNotificationsToggles = (buttonName: string): void => {
        setIsNotifications_reportActive(!isNotifications_reportActive);
        setClickedButton(buttonName); // To track which button was clicked
    };

    // Close the notifications center when the user clicks or scrolls outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (notisCenterRef.current && !notisCenterRef.current.contains(event.target as Node)) {
                setIsNotifications_reportActive(false);
            }
        };

        const handleScrollOutside = (): void => {
            setIsNotifications_reportActive(false); // Close the notifications center when scrolling
        };

        // Add the event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScrollOutside);

        // Cleanup event listeners when component unmounts or updates
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScrollOutside);
        };
    }, [isNotifications_reportActive]);

    return (
        <>
            <nav id="navbarContainer">
                <div className="iconContainer">
                    <Image id="reanotesIcon" src={RNICON} alt="reanotes" width={50} style={{cursor: 'pointer'}}
                           onClick={() => router.push('/home/unspecified')}/>

                    <div className="user-search_buttons">
                        <div className={isUserProfileClicked ? 'userProfile-active' : 'userProfile'}
                             onClick={handleUserProfileClicked}>
                            <Image src={RNICON} alt="userProfileImg" width={20} style={{borderRadius: '50%'}}/>
                            <h1 id="userUsername">Jadtales</h1>

                            <div className={isUserProfileClicked ? 'userButtons-active' : 'userButtons'}>
                                <Link href={`/settings`}>Settings</Link>
                                <button>Log out</button>
                            </div>

                            <Image src={RightArrowIcon} alt="expendUserSettings"/>
                        </div>

                        <div className="searchButton-active">
                            <Image src={SearchIcon} alt="expandProfileSettings"/>
                            <input type="search"
                                   placeholder="Search for highlights, people."
                                   name={'searchBar'}
                                   onClick={handleOpenBrowsePage}
                                   value={userSearchQuery}
                                   onChange={handleUserSearching}/>
                        </div>
                    </div>
                </div>


                <div className="userInteractionButtons">
                    <button id="getPremium" onClick={() => setShowModal(!showModal)}>
                        {showModal && <SubModalComponent/>}
                        Get premium
                    </button>

                    <button id="notificationsButton" className="stdIconStyling"
                            onClick={() => handleNotificationsToggles('notifications')}>
                        <Image src={NotificationsIcon} alt="settingIcon"/>
                    </button>

                    <button id="reportButton" className="stdIconStyling"
                            onClick={() => handleNotificationsToggles('report')}>
                        <Image src={ReportBugsIcon} alt="ReportIcon"/>
                    </button>
                </div>
            </nav>

            {/* Notifications/report center */}
            <div className={isNotifications_reportActive ? "notificationsCenter-active" : "notificationsCenter-inactive"}
                ref={notisCenterRef}  // Use ref to reference the notifications center div
            >
                <div className="collapseIcon_centerSwitchers_container">
                    <div className="collapseNotificationsCenter"
                         onClick={() => handleNotificationsToggles(clickedButton)}>
                        <Image src={CollapseArrow} alt="collapseNotificationsCenter"/>
                    </div>

                    <div className="switchNotiCenterToReportBugsCenter"
                         onClick={() => clickedButton === 'notifications' ?
                             setClickedButton('report bugs') : setClickedButton('notifications')}>
                        {clickedButton === "notifications" ?
                            (<Image src={ReportBugsIcon} alt="ReportBugsIcon" width={19}/>)
                            : <Image src={NotificationsIcon} alt="NotificationsIcon" width={19}/>}
                    </div>
                </div>
                <p>{clickedButton === 'notifications' ? 'your notifications' : 'report bugs'}</p>
                <hr style={{margin: "20px 10px"}}/>
                {clickedButton === "notifications" ? (<div className="receivedNotifications-inactive">
                    <NotificationsComponent username={"zuzanna"} purpose={"Updated"} targetChange={"Dark matter"}/>
                    <NotificationsComponent username={"jadtales"} purpose={"Posted"} targetChange={"Dark matter"}/>
                    <NotificationsComponent username={"jadtales"} purpose={"Posted"} targetChange={"Dark matter"}/>
                    <NotificationsComponent username={"jadtales"} purpose={"Posted"} targetChange={"Dark matter"}/>
                    <NotificationsComponent username={"jadtales"} purpose={"Posted"} targetChange={"Dark matter"}/>
                    <NotificationsComponent username={"jadtales"} purpose={"Posted"} targetChange={"Dark matter"}/>
                </div>) : (<div><ReportBugsComponent/></div>)}
            </div>
        </>
    );
}
