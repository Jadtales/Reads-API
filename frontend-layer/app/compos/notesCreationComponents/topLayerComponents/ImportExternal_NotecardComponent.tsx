import {ReactElement} from "react";
import '../notesCreationCompoStyling.css'
import KindleDeviceIcon from '@/public/icons/tablet-line.svg'
import Twitter_X_Icon from '@/public/icons/twitter-x-line.svg'
import ReadwiseIcon from '@/public/icons/readwise icon.png'
import Image from "next/image";

export default function ImportExternal_NotecardComponents(): ReactElement {
    return <div className="notesCreationFromExternalSources-layer">
        <h1>Import from</h1>

        <div className="importButtons">
            <button>Import highlights from your Kindle <Image src={KindleDeviceIcon} width={20} alt="kindle"/></button>
            <button>Import savings from <Image src={Twitter_X_Icon} width={20} alt="twitter"/></button>
            <button>Import your highlights from Readwise <Image src={ReadwiseIcon} width={20} alt="twitter"/></button>
            <button>Import your highlights from Kobo <Image src={ReadwiseIcon} width={20} alt="twitter"/></button>
        </div>
    </div>
}