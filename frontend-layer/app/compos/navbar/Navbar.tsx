"use client";
import React, { ReactElement, useState} from "react";
import {useRouter} from 'nextjs-toploader/app';
import "./navbarStyling.css";

import SubModalComponent from "@/app/compos/subscriptionModal/SubModalComponent";
import SearchInputFieldComponent from "@/app/compos/navbar/navbar_microComponents/SearchInputFieldComponent";
import NavbarUserProfileComponent from "@/app/compos/navbar/navbar_microComponents/NavbarUserProfileComponent";
import BrowsingComponent from "@/app/compos/browsing/BrowsingComponent";
import NotificationsCenterComponent
    from "@/app/compos/navbar/notifications_reportBugs_Component/notificationsComponents/NotificationsCenterComponent";

export default function Navbar(): ReactElement {
    const [showModal, setShowModal] = useState<boolean>(false)
    const router = useRouter();

    const closeModal = (toClose: boolean): void => {
        setShowModal(toClose)
    }

    return (
        <nav id="navbarContainer">
            <div className="iconContainer">
                <h1 id="reanotesIcon" style={{cursor: 'pointer'}}
                    onClick={() => router.push('/home/unspecified')}>
                    Reanotes
                </h1>

                <div className="user-search_buttons">
                    <NavbarUserProfileComponent/>
                    <BrowsingComponent/>
                    <SearchInputFieldComponent/>
                </div>
            </div>


            <div className="userInteractionButtons">
                <button id="getPremium" onClick={() => setShowModal(!showModal)}>
                    {showModal && <SubModalComponent onCloseModal={closeModal}/>}
                    <p>Get premium</p>
                </button>

                <NotificationsCenterComponent/>
            </div>
        </nav>
    );
}
