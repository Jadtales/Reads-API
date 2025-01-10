'use client'

import {ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import '../notesCreationCompoStyling.css'

import OpenLockIcon from '@/public/icons/notesIcons/openLockIcon.svg'
import LockIcon from '@/public/icons/notesIcons/lockIcon.svg'
import ArrowUpIcon from '@/public/icons/arrow-up-line.svg'
import ImportExternal_NotecardComponents
    from "@/app/compos/notesCreationComponents/topLayerComponents/import-external-notes-components/ImportExternal_NotecardComponent";
import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import {useMediaQuery} from "react-responsive";

export default function NotesCreationButtons(): ReactElement<any> {
    const [isSharingButtonClicked, setIsSharingButtonClicked] = useState<boolean>(true);
    const pageHeight = useMediaQuery({height: '(height >= 300px)'});

    const handleGoBackToTop = () => {
        window.scrollTo({top: 900, behavior: 'smooth'});
    }


    const switchSharingOption = (): void => {
        setIsSharingButtonClicked(!isSharingButtonClicked);
    }


    return (
        <div className="createnotes-topLayer">
            <div
                className={pageHeight  ? 'creationButton-layer-withNavbar' : 'creationButton-layer'}>
                <div className="lastSaveTime">
                    <GoBackToComponent withText={true} iconSize={'25px'}/> -
                    Last saved, 3 seconds ago.
                </div>

                <div className="creationButtons">

                    {pageHeight  && <Image src={ArrowUpIcon}
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