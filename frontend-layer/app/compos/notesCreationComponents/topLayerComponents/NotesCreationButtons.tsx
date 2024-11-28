'use client'

import {ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import '../notesCreationCompoStyling.css'

import OpenLockIcon from '@/public/icons/notesIcons/openLockIcon.svg'
import LockIcon from '@/public/icons/notesIcons/lockIcon.svg'
import ArrowUpIcon from '@/public/icons/arrow-up-line.svg'
import ImportExternal_NotecardComponents
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/ImportExternal_NotecardComponent";

export default function NotesCreationButtons(): ReactElement {
    const [isSharingButtonClicked, setIsSharingButtonClicked] = useState<boolean>(true);
    const [pageHeight, setPageHeight] = useState<number>(0);

    const switchSharingOption = (): void => {
        setIsSharingButtonClicked(!isSharingButtonClicked);
    }

    useEffect(() => {
        const getScrollHeight = (): void => {
            setPageHeight(window.scrollY);
        };

        // Debounce scroll event handler for performance
        const debounceScroll = (): () => void => {
            let timer: NodeJS.Timeout;
            return (): void => {
                clearTimeout(timer);
                timer = setTimeout(getScrollHeight, 100);  // Call after 100ms of no scroll event
            };
        };

        const handleDebouncedScroll = debounceScroll();
        window.addEventListener('scroll', handleDebouncedScroll);

        return () => {
            window.removeEventListener('scroll', handleDebouncedScroll);
        };
    }, []);

    const handleGoBackToTop = () => {
        window.scrollTo({top: 900, behavior: 'smooth'});
    }

    return (
        <div className="createnotes-topLayer">
            <div
                className={pageHeight > window.innerHeight ? 'creationButton-layer-withNavbar' : 'creationButton-layer'}>
                <div className="lastSaveTime">
                    Last saved, 3 seconds ago.
                </div>

                <div className="creationButtons">

                    {pageHeight > window.innerHeight && <Image src={ArrowUpIcon}
                                                               id="arrowUpIcon"
                                                               alt="goUp"
                                                               style={{cursor: 'pointer'}}
                                                               onClick={handleGoBackToTop}/>}
                    <button className="sharingOption" onClick={switchSharingOption}>
                        {isSharingButtonClicked ?
                            <Image src={OpenLockIcon} alt="publicNote" width={19}/>
                            : <Image src={LockIcon} alt="publicNote" width={19}/>}
                        {isSharingButtonClicked ?
                            (<span>Public</span>) : <span>Private</span>}
                    </button>

                    <button className="noteCreationButton">Create</button>
                </div>
            </div>

            <ImportExternal_NotecardComponents/>
        </div>
    )
}