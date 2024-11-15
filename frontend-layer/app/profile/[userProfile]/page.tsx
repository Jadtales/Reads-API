'use client'

import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import Image from "next/image";
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";
import {Fragment, ReactElement} from "react";
import Link from "next/link";
import './userProfilePageStyling.css'

// imported icons
import TwitterIcon from '@/public/icons/socialsIcons/twitter-x-line.svg'
import InstagramIcon from '@/public/icons/socialsIcons/instagram-line.svg'
import WebsiteLinkIcon from '@/public/icons/copyUrlLink.svg'
import UploadUserProfileImg from "@/app/compos/profileComponents/UploadUserProfileImg";

export default function UserProfilePage(): ReactElement {
    return <Fragment>
        <GoBackToComponent/>

        <div className="userProfilePageContainer">

            <div className="userIntroduction">
                <div className="UserName_briefIntro">
                    <h1 className="userName">Jadtales</h1>
                    <p>I like sharing knowledge</p>
                </div>

                <div className="userInterests">
                    <h1>Jadtales Interests</h1>
                    <ul>
                        <li>#Fiction</li>
                        <li>#Crime</li>
                        <li>#Politics</li>
                    </ul>
                </div>

                <div className="user_followers_followee">
                    <div className="userFollowers">
                        <h5>Followers</h5>
                        <span>4232</span>
                    </div>
                    <div className="userFollowing">
                        <h5>Follows</h5>
                        <span>321</span>
                    </div>
                </div>

                <div className="aboutUserSection">
                    <h1>About me</h1>
                    <span className="userAboutMeText">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum expedita fugit maxime nisi officia
                        repellat sint temporibus voluptates. At beatae dolore, exercitationem facilis fuga officiis
                        voluptate? Accusamus inventore odit quod?
                    </span>
                </div>

                <div className="userCardnotes">
                    <h1>Jadtales Cardnotes - 421</h1>
                    <div className="userPopularNotecards">
                        <FrontDesignNoteBrowse bookTitle={'there, there'} bookAuthor={'toomy orange'}
                                               notedByUsername={'Jadtales'}/>
                        <FrontDesignNoteBrowse bookTitle={'there, there'} bookAuthor={'toomy orange'}
                                               notedByUsername={'Jadtales'}/>
                        <FrontDesignNoteBrowse bookTitle={'there, there'} bookAuthor={'toomy orange'}
                                               notedByUsername={'Jadtales'}/>
                        <FrontDesignNoteBrowse bookTitle={'there, there'} bookAuthor={'toomy orange'}
                                               notedByUsername={'Jadtales'}/>
                    </div>
                </div>
            </div>



            <div className="userSocials">
                <UploadUserProfileImg/>
                <div className="userSocialsLinks">
                    <Link href={"/instagram"}>Twitter<Image src={TwitterIcon} alt={'goToTwitter'}/></Link>
                    <Link href={"/instagram"}>Instagram<Image src={InstagramIcon} alt={'goToInstagram'}/></Link>
                    <Link href={"/instagram"}>Website<Image src={WebsiteLinkIcon} alt={'goToUserOfficialWebsite'}/></Link>
                </div>
            </div>
        </div>
    </Fragment>
}