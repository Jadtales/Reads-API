import React, {ReactElement} from "react";
import Link from "next/link";
import '../welcomingComponentStyling.css'

interface componentProps{
    NoteCardTitle: string;
    lastTimeVisited: number;
    toNoteCardLink: string;
}

export default function RecentVisitedNote({NoteCardTitle, lastTimeVisited, toNoteCardLink}: componentProps): ReactElement<any> {
    return <div id={'recentViewedNoteCardContainer'}>
        <div className="title_visitedDuration">
            <h4>{NoteCardTitle}</h4>
            <span>Review {lastTimeVisited} days ago</span>
        </div>

        <Link href={`/${toNoteCardLink}`}>Resume</Link>
    </div>
}