import {ChangeEvent, ReactElement, useRef} from "react";

import importIcon from '@/public/icons/upload-cloud-line.svg'
import Image from "next/image";
import '../addNoteButtonComponentStyling.css'


export default function UploadKindleHighlights(): ReactElement {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0]
        if (file) {
            console.log("File selected:", file.name)

        }
    };

    return (
        <>
            <button
                className="addNoteButton-kindleFile"
                onClick={handleFileInput}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".txt"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />

                Import Highlights <Image src={importIcon}
                                         alt="importKindleHighlights"
                                         width={20}/>
            </button>
        </>
    )
}