import {Fragment, ReactElement} from "react";
import Image from "next/image";
import './noteCardReviewComponentStyling.css'

// imported icons
import ArrowLeftIcon from '@/public/icons/leftTo.svg'
import ArrowRightIcon from '@/public/icons/rightTo.svg'
import LeftQuantityCardsIcon from '@/public/icons/leftQuantityCardsIcon.svg'

interface NoteCardMemorizationProps {
    duesCards: number;
    newCards: number;
    cards: { term: string, definition: string }[];
}

export default function NoteCardMemorize(): ReactElement {
    return <Fragment>
        <div className="noteCardMemorizeContainer">
            <div className="cardsLeftStatus">
                <span className="duesCards">Due: 4</span>
                <span className="newCards">New: 2</span>
            </div>

            <div className="cards">
                <div className="cardContent">
                    <Image src={ArrowLeftIcon} alt="previousCard" width={80}/>
                    <p id="cardTerm">What did Jadtales say about love ?</p>
                    <p id="cardDefinition">I couldn't find anything to kill myself with, so i loved you.</p>
                    <Image src={ArrowRightIcon} alt="nextCard" width={80}/>
                </div>
            </div>

            <div className="leftQuantityCards">
                <Image src={LeftQuantityCardsIcon} alt="leftQuantityCards"/>3/8
            </div>

        </div>
        <br/>
        <div className="difficultyLearningProcess">
            <span className="difficultyLevel_again">Again</span>
            <hr/>
            <span className="difficultyLevel_hard">Hard</span>
            <hr/>
            <span className="difficultyLevel_good">Good</span>
            <hr/>
            <span className="difficultyLevel_easy">Easy</span>
        </div>
    </Fragment>
}