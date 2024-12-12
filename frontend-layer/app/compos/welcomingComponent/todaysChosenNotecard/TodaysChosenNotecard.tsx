import {ReactElement} from "react";
import './chosenNotecardStyling.css'
import FrontDesignNoteBrowse from "@/app/compos/suggested-frontDesignNote/FrontDesignNote-browse";
import Link from "next/link";

interface ComponentProps{
    creator: string
}
export default function TodaysChosenNotecard({creator}: ComponentProps): ReactElement {

    return <div className="chosenNotecardContainer">
        <div className="header">
            <h5>Today's chosen Notecard.</h5>
            -
            <h5>Made by <Link href={`/jadtales`}>@Jadtales</Link></h5>
        </div>

        <hr style={{margin: '8px 0'}}/>

        <FrontDesignNoteBrowse
            bookTitle={'There, there'}
            bookAuthor={'Tommy Orange'}
            notedByUsername={'Jadtales'}/>
    </div>
}