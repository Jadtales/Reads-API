import {ChangeEvent, ReactElement, useRef} from "react";
import Image from "next/image";
import '../../profile/[userProfile]/userProfilePageStyling.css'

import ReanotesIcon from "@/favicon.png";
import WarningNotification from "@/app/compos/warningNotificationComponent/WarningNotification";

export default function UploadUserProfileImg(): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleProfileChange = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    }

    const handleUploadedProfileImg = (event: ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files?.[0]
        const maxSizeInBytes: number = 10 * 1024 * 1024 // maxSizeInBytes is 10MB

        if(img && img.size > maxSizeInBytes){
            event.target.value = ''
        }
    }

    return <div className="userProfileImg_uploadImg">
        <Image src={ReanotesIcon} alt="userProfile" width={130} onClick={handleProfileChange}/>


        <div className="importUserProfileImg">
            <input style={{display: 'none'}}
                   type="file"
                   accept={'image/png' || 'image/jpeg'}
                   ref={inputRef}
                   onChange={handleUploadedProfileImg}
            />
        </div>

        <WarningNotification warningContext={'Image must be less than 10MB'}/>
    </div>
}