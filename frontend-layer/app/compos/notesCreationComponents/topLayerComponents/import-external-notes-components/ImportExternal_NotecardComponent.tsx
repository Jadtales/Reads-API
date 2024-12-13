import {ReactElement} from "react";
import '../../notesCreationCompoStyling.css'
import Twitter_X_Icon from '@/public/icons/twitter-x-line.svg'
import ReadwiseIcon from '@/public/icons/readwise icon.png'
import KoboIcon from '@/public/icons/socialsIcons/kobo-icon.svg'
import NotionIcon from '@/public/icons/socialsIcons/notion-icon.svg'
import Image from "next/image";
import KindleHighlightsSelectionComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/kindle/kindleHighlightsComponents/KindleHighlightsSelectionComponent";

export default function ImportExternal_NotecardComponents(): ReactElement {


    return <div className="notesCreationFromExternalSources-layer">
        <h1>Import from</h1>

        <div className="importButtons">
            <KindleHighlightsSelectionComponent/>
            <button>Import threads from <Image src={Twitter_X_Icon} width={20} alt="twitter"/></button>
            <button>Import highlights from Readwise <Image src={ReadwiseIcon} width={20} alt="twitter"/></button>
            <button>Import highlights from Notion <Image src={NotionIcon} width={25} alt="twitter"/></button>
            <button>Import highlights from Kobo <Image src={KoboIcon} width={30} alt="twitter"/></button>
        </div>
    </div>
}