import React, {ReactElement, useState} from "react";
import Image from "next/image";
import RNICON from "@/public/RN-icon.png";
import Link from "next/link";
import {useRouter} from 'nextjs-toploader/app';

import '../navbarStyling.css'

import RightArrowIcon from "@/public/icons/rightarrow.svg";
import LeftArrowIcon from '@/public/icons/leftarrow.svg'

export default function NavbarUserProfileComponent(): ReactElement {
    const [isUserProfileClicked, setIsUserProfileClicked] = useState<boolean>(false);

    const router = useRouter()

    const handleUserProfileClicked = (): void => {
        setIsUserProfileClicked(!isUserProfileClicked);
    };

    const handleGoingToUserProfile = (): void => {
        router.push(`/profile/${document.getElementById('userUsername')?.innerText.toLowerCase()}`)
        setIsUserProfileClicked(!isUserProfileClicked)
    }

    return (
        <div className={isUserProfileClicked ? 'userProfile-active' : 'userProfile'}
             onClick={handleUserProfileClicked}>
            <Image src={RNICON}
                   alt="userProfileImg"
                   width={20}
                   style={{borderRadius: '50%'}}/>

            <h1 id="userUsername" onClick={handleGoingToUserProfile}>Jadtales</h1>

            <div className={isUserProfileClicked ? 'userButtons-active' : 'userButtons'}>
                <Link href={`/settings`}>Settings</Link>
                <button>Log out</button>
            </div>

            <Image src={isUserProfileClicked ? LeftArrowIcon : RightArrowIcon}
                   alt="expendUserSettings"
                   id="expandUserProfile"/>
        </div>
    )
}