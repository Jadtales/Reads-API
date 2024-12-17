import {Fragment, ReactElement, useRef} from "react";
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


    const pathname = usePathname()
    const shareModalDialogRef = useRef<HTMLDialogElement | null>(null);

    const handleDialogOpening = (): void => {
        const shareModalDialog = shareModalDialogRef.current as HTMLDialogElement;

        if(!shareModalDialog.open){
            shareModalDialog.showModal();
        }else{
            shareModalDialog.close();
        }
    }

    return <Fragment>
        <button className={'shareButtonIcon'}>
            <Image src={ShareContentIcon} alt={"shareThisStat"} id="shareStatsContentIcon"
                   onClick={handleDialogOpening}/>
        </button>

        <dialog className="shareModalDialog" ref={shareModalDialogRef}>
            <div className="shareModalContainer">

                <div className="shareIcon_shareModalClosingIcon">
                    <Image src={ShareContentIcon} alt="shareModalIcon"/>

                    <Image src={ClosingIcon} className={'closeModalIcon'} alt="closeShareModalIcon" onClick={handleDialogOpening}/>
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
        </dialog>
    </Fragment>


}