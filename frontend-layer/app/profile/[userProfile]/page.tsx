'use client'
import './userProfilePageStyling.css'

import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import Image from "next/image";
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";
import {Fragment, ReactElement} from "react";

// imported icons
import ReanotesIcon from '@/favicon.png'
import StarFull from '@/public/icons/star-fill.svg'
import StarHalf from '@/public/icons/star-half-line.svg'

export default function UserProfilePage(): ReactElement {
    return <Fragment>
        <GoBackToComponent/>

        <div className="userProfilePageContainer">
            <div className="userBriefIntro">

                <div className="aboutUserSection">
                    <Image src={ReanotesIcon} alt="userProfile" width={100}/>
                    <div className="userAboutMeText">
                        <div className="aboutUserHeadlight_followers_followee">
                            <h1 className="aboutUserH1">About Jadtales</h1>

                            <div className="user_followers_followee">
                                <div className="userFollowers">
                                    <h1>Followers - 321</h1>
                                </div>
                                <div className="userFollowers">
                                    <h1>Follows - 321</h1>
                                </div>
                            </div>
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum expedita fugit maxime nisi officia
                        repellat sint temporibus voluptates. At beatae dolore, exercitationem facilis fuga officiis
                        voluptate? Accusamus inventore odit quod?
                    </div>
                </div>

            </div>

            <div className="otherInfos">
            <div className="userAverageRating">
                    <h1>Jadtales Rating</h1>
                    <span className="userRate">
                        <Image src={StarFull} alt="fullStar"/>
                        <Image src={StarFull} alt="fullStar"/>
                        <Image src={StarFull} alt="fullStar"/>
                        <Image src={StarFull} alt="fullStar"/>
                        <Image src={StarHalf} alt="halfStar"/>
                        - 4.5
                    </span>
                </div>

                <div className="userInterests">
                    <h1>Jadtales Interests</h1>
                    <ul>
                        <li>#Fiction</li>
                        <li>#Crime</li>
                        <li>#Politics</li>
                    </ul>
                </div>

                <div className="userNoteCards">
                    <h1>Jadtales Popular Note Cards</h1>
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
        </div>
    </Fragment>
}