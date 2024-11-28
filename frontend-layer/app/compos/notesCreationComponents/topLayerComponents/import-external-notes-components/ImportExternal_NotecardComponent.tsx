import {ReactElement} from "react";
import '../../notesCreationCompoStyling.css'
import Twitter_X_Icon from '@/public/icons/twitter-x-line.svg'
import ReadwiseIcon from '@/public/icons/readwise icon.png'
import Image from "next/image";
import ImportKindleNotesComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/kindle/ImportKindleNotesComponent";

export default function ImportExternal_NotecardComponents(): ReactElement {

    const {buttonComponent} = ImportKindleNotesComponent('')

    return <div className="notesCreationFromExternalSources-layer">
        <h1>Import from</h1>

        <div className="importButtons">
            {buttonComponent}
            <button>Import threads from <Image src={Twitter_X_Icon} width={20} alt="twitter"/></button>
            <button>Import highlights from Readwise <Image src={ReadwiseIcon} width={20} alt="twitter"/></button>
            <button>Import highlights from Kobo <Image src={ReadwiseIcon} width={20} alt="twitter"/></button>
        </div>
    </div>
}