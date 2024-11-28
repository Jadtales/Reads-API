import {Fragment, ReactElement, useRef, useState} from "react";
import Image from "next/image";
import KindleDeviceIcon from "@/public/icons/tablet-line.svg";
import {Input} from "postcss";
import KindleHighlightsSelectionComponent
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/kindle/KindleHighlightsSelectionComponent";

interface ComponentProps {
    fileClippings: string;
}

export default function ImportKindleNotesComponent({fileClippings}: ComponentProps): {
    buttonComponent: ReactElement,
    noteCardsData?: {
        cardKey: number;
        cardTitle: string;
        cardDefinition: string;
    }[]
} {
    const [file, setFile] = useState<File | null>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileFiltering = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }


    }

    const initInputOpen = () => {
        if (inputRef.current) {
            inputRef.current?.click()
        }
    }

    const buttonComponent: ReactElement = (
        <Fragment>
            <button onClick={initInputOpen}>Import highlights from Kindle <Image src={KindleDeviceIcon} width={20}
                                                                                      alt="kindle"/></button>

            {file && <KindleHighlightsSelectionComponent file={file}/>}

            {/*for input files*/}
            <input type="file" ref={inputRef} onChange={handleFileFiltering} style={{display: 'none'}}/>
        </Fragment>
    )

    return {
        buttonComponent,
    }
}