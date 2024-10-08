'use client'
import './userProfilePageStyling.css'

import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import Image from "next/image";
import ReanotesIcon from '@/favicon.png'
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";
import {Fragment, ReactElement} from "react";

export default function UserProfilePage(): ReactElement {
    return <Fragment>
        <GoBackToComponent/>

        <div className="userProfilePageContainer">
            <div className="userBriefIntro">
                <Image src={ReanotesIcon} alt="userProfile" width={100}/>

                <div className="aboutUserSection">
                    <h1>About Jadtales</h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum expedita fugit maxime nisi officia
                    repellat sint temporibus voluptates. At beatae dolore, exercitationem facilis fuga officiis
                    voluptate? Accusamus inventore odit quod?
                </div>

                <div className="user_followers_followee">
                    <div className="userFollowers">
                        <h1>Followers - 321</h1>
                    </div>
                    <div className="userFollowers">
                        <h1>Follows - 321</h1>
                    </div>
                </div>
            </div>

            <div className="otherInfos">
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
                        <FrontDesignNoteBrowse bookTitle={'there, there'} bookAuthor={'toomy orange'}
                                               notedByUsername={'Jadtales'}/>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
}