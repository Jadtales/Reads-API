import {ReactElement} from "react";
import '../../notesCreationCompoStyling.css'
import Twitter_X_Icon from '@/public/icons/twitter-x-line.svg'
import ReadwiseIcon from '@/public/icons/readwise icon.png'
import KoboIcon from '@/public/icons/socialsIcons/kobo-icon.svg'
import NotionIcon from '@/public/icons/socialsIcons/notion-icon.svg'
import Image from "next/image";
import KindleHighlightsSelectionComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/kindle/kindleHighlightsComponents/KindleHighlightsSelectionComponent";

export default function ImportExternal_NotecardComponents(): ReactElement<any> {


    return <div className="notesCreationFromExternalSources-layer">
        <h1>Import from</h1>

        <div className="importButtons">
            <KindleHighlightsSelectionComponent/>
            <button><Image src={KoboIcon} width={33} alt="twitter"/> Kobo</button>
            <button><Image src={ReadwiseIcon} width={20} alt="twitter"/> Readwise</button>
            <button><Image src={Twitter_X_Icon} width={20} alt="twitter"/> X </button>
            <button><Image src={NotionIcon} width={25} alt="twitter"/> Notion</button>
        </div>
    </div>
}