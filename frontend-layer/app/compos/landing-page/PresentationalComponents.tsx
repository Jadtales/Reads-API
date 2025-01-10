import {ReactElement} from "react";
import Image from "next/image";
import './landingPageStyling.css'

import BooksIcon from '@/public/icons/book-open-line.svg'
import GroupIcon from '@/public/icons/group-3-fill.svg'

export default function PresentationalComponents(): ReactElement<any> {
    return <div className="PC_Container">
        <div className="importNotesContainer">

            <span>
                <Image src={BooksIcon} alt={'share_your_notes'}/>
                Bring your knowledge from everywhere
            </span>

            <p>
                Create Projects and add knowledge so that you can deliver expert-level
                results with the Claude Pro, Team
                and Enterprise plans.
            </p>
        </div>
        <div className="shareNotesContainer">

            <span>
                <Image src={GroupIcon} alt={'share_your_notes'}/>
                Share your best tips with people
            </span>
            <p>
                Share your best chats with your team to spark better ideas and move
                work forward on the Claude Team and Enterprise plans.
            </p>
        </div>
    </div>
}