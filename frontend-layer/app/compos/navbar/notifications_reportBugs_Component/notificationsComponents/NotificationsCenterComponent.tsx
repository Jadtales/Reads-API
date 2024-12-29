import React, {Fragment, ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";

import CollapseArrow from "@/public/icons/collapseArrow.svg";
import ReportBugsIcon from "@/public/icons/error-warning-line.svg";
import NotificationsIcon from "@/public/icons/notification-line.svg";
import ReportBugsComponent from "@/app/compos/navbar/notifications_reportBugs_Component/ReportBugsComponent";
import NotificationFilledIcon from "@/public/icons/notification-fill.svg";
import NotificationsDurationFiltering
    from "@/app/compos/navbar/notifications_reportBugs_Component/notificationsComponents/NotificationsDurationFiltering";

const notificationsData = [
    {
        username: "zuzanna", purpose: "Updated", targetChange: "Dark matter",
        dateOfReceiving: new Date(2024, 10, 12) // November 12, 2024
    },
    {
        username: "jadtales", purpose: "Posted", targetChange: "Dark matter",
        dateOfReceiving: new Date(2024, 10, 6) // November 6, 2024
    },
    {
        username: "jadtales", purpose: "Posted", targetChange: "Dark matter",
        dateOfReceiving: new Date(2024, 9, 29) // October 29, 2024
    },
    {
        username: "jadtales", purpose: "Posted", targetChange: "Dark matter",
        dateOfReceiving: new Date(2024, 9, 26) // October 26, 2024
    },
    {
        username: "jadtales", purpose: "Posted", targetChange: "Dark matter",
        dateOfReceiving: new Date(2024, 9, 20) // October 20, 2024
    }
];


export default function NotificationsCenterComponent(): ReactElement<any> {
    const [isNotifications_reportActive, setIsNotifications_reportActive] = useState<boolean>(false);
    const [clickedButton, setClickedButton] = useState<string>('');

    const notisCenterRef = useRef<HTMLDivElement>(null);

    const handleNotificationsToggles = (buttonName: string): void => {
        setIsNotifications_reportActive(!isNotifications_reportActive);
        setClickedButton(buttonName);
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

    return <Fragment>
        <button id="notificationsButton" className="stdIconStyling"
                onClick={() => handleNotificationsToggles('notifications')}>
            <Image src={notificationsData.length > 0 ? NotificationFilledIcon : NotificationsIcon}
                   alt="settingIcon"/>
            <h2 className={'numberOfReceivedNotifications'}>{notificationsData.length >= 99 ? '99..' : notificationsData.length}</h2>
        </button>

        <button id="reportButton" className="stdIconStyling"
                onClick={() => handleNotificationsToggles('report')}>
            <Image src={ReportBugsIcon} alt="ReportIcon"/>
        </button>
        <div
            className={isNotifications_reportActive ? "notificationsCenter-active" : "notificationsCenter-inactive"}
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

            {clickedButton === "notifications" ?
                <NotificationsDurationFiltering NotificationsData={notificationsData}/> : (
                    <div><ReportBugsComponent/></div>)}
        </div>
    </Fragment>


}