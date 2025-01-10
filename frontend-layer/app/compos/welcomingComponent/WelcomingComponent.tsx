import {ReactElement} from "react";
import RecentVisitedNote from "@/app/compos/welcomingComponent/recentVisitedNotes/RVN-component";
import './welcomingComponentStyling.css'
import TodaysChosenNotecard from "@/app/compos/welcomingComponent/todaysChosenNotecard/TodaysChosenNotecard";

interface WelcomingComponentProps {
    username: string;
}


export default function Welcoming({username}: WelcomingComponentProps): ReactElement<any> {

    const greetingTimeVerb: string = new Date().getHours() >= 12 || new Date().getHours() <= 23 ? 'Evening' : 'Morning';

    return <div id={'welcomingCompoContainer'}>
        <h1 className="greeting">{greetingTimeVerb}, <span>{username}!</span></h1>

        <div className="welcomingSectionContainer">
            <div className="recentViewedNotecards">
                <RecentVisitedNote NoteCardTitle={'Adventures of Huckleberry Finn'}
                                   lastTimeVisited={4}
                                   toNoteCardLink={'there-there'}/>
                <RecentVisitedNote NoteCardTitle={'Moby dick'}
                                   lastTimeVisited={4}
                                   toNoteCardLink={'there-there'}/>
                <RecentVisitedNote NoteCardTitle={'War and peace'}
                                   lastTimeVisited={4}
                                   toNoteCardLink={'there-there'}/>
                <RecentVisitedNote NoteCardTitle={'There, there'}
                                   lastTimeVisited={4}
                                   toNoteCardLink={'there-there'}/>
                <RecentVisitedNote NoteCardTitle={'There, there'}
                                   lastTimeVisited={4}
                                   toNoteCardLink={'there-there'}/>
                <RecentVisitedNote NoteCardTitle={'There, there'}
                                   lastTimeVisited={4}
                                   toNoteCardLink={'there-there'}/>

            </div>

            <TodaysChosenNotecard creator={'Jadtales'}/>
        </div>
    </div>
}