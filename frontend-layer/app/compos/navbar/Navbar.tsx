"use client";
import React, {ReactElement} from "react";
import {useRouter} from 'nextjs-toploader/app';
import "./navbarStyling.css";

import SubModalComponent from "@/app/compos/modals/subscriptionModal/SubModalComponent";
import SearchInputFieldComponent from "@/app/compos/navbar/navbar_microComponents/SearchInputFieldComponent";
import NavbarUserProfileComponent from "@/app/compos/navbar/navbar_microComponents/NavbarUserProfileComponent";
import BrowsingComponent from "@/app/compos/browsing/BrowsingComponent";
import NotificationsCenterComponent
    from "@/app/compos/navbar/notifications_reportBugs_Component/notificationsComponents/NotificationsCenterComponent";

export default function Navbar(): ReactElement<HTMLDivElement> {
    const router = useRouter();

    return (
        <nav id="navbarContainer">
            <div className="iconContainer">
                <h1 id="reanotesIcon" style={{cursor: 'pointer'}}
                    onClick={() => router.push('/home/unspecified')}>
                    Reanotes
                </h1>

                <div className="user-search_buttons">
                    <NavbarUserProfileComponent phoneScreenSize={false}/>
                    <BrowsingComponent/>
                    <SearchInputFieldComponent/>
                </div>
            </div>


            <div className="userInteractionButtons">
                <SubModalComponent/>
                <NotificationsCenterComponent/>
            </div>
        </nav>
    );
}
