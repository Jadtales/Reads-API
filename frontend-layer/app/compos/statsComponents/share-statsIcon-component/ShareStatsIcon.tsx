import {ReactElement, useState} from "react";
import Image from "next/image";

import './shareModalStyling.css'

import ShareContentIcon from "@/public/icons/shareContent.svg";
import ClosingIcon from '@/public/icons/notesIcons/close-line.svg';
import CopyURLIcon from '@/public/icons/copyUrlLink.svg'

// social icons


interface ShareStatsProps {
    statsPeriod: string;
    whoSharedStats: string;
    sharedStatsTypeOfContent: string;
    sharedStatsContent: string;
}

export default function ShareStatsIcon({
                                           statsPeriod,
                                           whoSharedStats,
                                           sharedStatsTypeOfContent,
                                           sharedStatsContent
                                       }: ShareStatsProps
):
    ReactElement {
    const [showModal, setShowModal] = useState<boolean>(false);


    return <>
        <div className="shareStatsIcon_container">
            <Image src={ShareContentIcon} alt={"shareThisStat"} id="shareStatsContentIcon"
                   onClick={() => setShowModal(!showModal)}/>
        </div>

        {showModal && (<div className="shareModalBackground">
            <div className="shareModalContainer">

                <div className="shareIcon_shareModalClosingIcon">
                    <Image src={ShareContentIcon} alt="shareModalIcon"/>

                    <Image src={ClosingIcon} alt="closeShareModalIcon" onClick={() => setShowModal(!showModal)}/>
                </div>

                <div className="shareOnSocials">

                </div>

                <hr/>
                <div className="copyLinkContainer">
                    <p>https://remixicon.com/icon/links-line</p>
                    <Image src={CopyURLIcon} alt="copyLink"/>
                </div>
            </div>
        </div>)}
    </>


}