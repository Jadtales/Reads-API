import {Fragment, ReactElement, useState} from "react";
import Image from "next/image";

import './shareModalStyling.css'

import ShareContentIcon from "@/public/icons/shareContent.svg";
import ClosingIcon from '@/public/icons/notesIcons/close-line.svg';
import CopyURLIcon from '@/public/icons/copyUrlLink.svg'

// social icons
import TwitterIcon from '@/public/icons/socialsIcons/twitter-x-line.svg'
import InstagramIcon from '@/public/icons/socialsIcons/instagram-line.svg'
import ReanotesIcon from '@/favicon.png'

// images to be shared with the shared stats
import CoolImg from '@/public/shareContentImgs/Photo Manipulation.jpg'
import {usePathname} from "next/navigation";


interface ShareStatsProps {
    statsPeriod?: string;
    whoShared: string;
    sharedTypeOfContent: string;
    sharedContent: string;
}

export default function ShareStatsModal({
                                            statsPeriod,
                                            whoShared,
                                            sharedTypeOfContent,
                                            sharedContent
                                        }: ShareStatsProps
):
    ReactElement {
    const [showModal, setShowModal] = useState<boolean>(false);

    const pathname = usePathname()
    return <Fragment>
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

                <div className="contentToBeShared">
                    <div className="topLayer">
                        <span className="username">{whoShared}</span>
                    </div>
                    <div className="sharedContentContainer">
                        <span className="statsPeriod">{statsPeriod}</span>
                        {/*<span className="typeOfSharedContent">*/}
                        {/*    {sharedTypeOfContent}*/}
                        {/*</span>*/}
                        <div className="sharedContent"
                             style={{fontSize: '20px', width: '35vw', overflowY: 'scroll', height: '30vh'}}>
                            {sharedContent}
                        </div>
                    </div>

                    <Image src={ReanotesIcon} alt="Reanotes" id="reanotesIcon"/>
                </div>

                <hr style={{margin: '1% 0'}}/>
                <div className="copyLinkContainer">
                    <div className="socialLinks_headlight">
                        <h1>Stat Link</h1>
                        <div className="shareOnSocials">
                            <Image src={InstagramIcon} alt="insagram"/>
                            <Image src={TwitterIcon} alt="twitter"/>
                        </div>
                    </div>
                    <div className="copyLink">
                        <p>https://reanotes.io/{pathname}</p>
                        <Image src={CopyURLIcon} alt="copyLink"/>
                    </div>
                </div>
            </div>
        </div>)}
    </Fragment>


}