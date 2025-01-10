import React, {Fragment, ReactElement} from "react";
import Image from "next/image";
import './exportNotecardModalStyling.css'
import DownloadIcon from "@/public/icons/frontNoteSetting-icons/download-line.svg";

interface ComponentProps {
    isPhoneSize?: boolean;
}

export default function ExportNotecardModal({isPhoneSize = false}: ComponentProps): ReactElement {
    return <Fragment>

        <li className={'exportNotecardModalButton'}><Image src={DownloadIcon} width={20} alt="exportNote"/>{!isPhoneSize && 'Export'}</li>

        <dialog className={'exportNotecardModalContainer'}>

        </dialog>
    </Fragment>
}