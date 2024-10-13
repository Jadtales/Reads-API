import {Fragment, ReactElement, useState} from "react";
import Image from "next/image";
import './noteCardReviewComponentStyling.css'

// imported icons
import ArrowLeftIcon from '@/public/icons/leftTo.svg'
import ArrowRightIcon from '@/public/icons/rightTo.svg'
import LeftQuantityCardsIcon from '@/public/icons/leftQuantityCardsIcon.svg'
import {Simulate} from "react-dom/test-utils";

interface NoteCardMemorizationProps {
    duesCards: number;
    newCards: number;
    cards: { term: string, definition: string }[];
}

export default function NoteCardMemorize(): ReactElement {
    const [showDefinition, setShowDefinition] = useState<boolean>(false);

    const handleShowDefinition = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            setShowDefinition(!showDefinition);
        }
    };

    const handleNextPreviousCardsChange = (event: KeyboardEvent): void => {
        if (event.key === 'arrowLeft') {

        }
    }

    const handleCardMemorizationDifficulty = (event: KeyboardEvent): void => {
        if(event.key === '1' || event.key === 'a') {

        }
    }

    return (
        <Fragment>
            <div className="noteCardMemorizeContainer">
                <div className="cardsLeftStatus">
                    <span className="duesCards">Due: 4</span>
                    <span className="newCards">New: 2</span>
                </div>

                <div className="cards">
                    <div className="cardContent">
                        <Image src={ArrowLeftIcon} alt="previousCard" width={80}/>

                        {showDefinition ? (
                            <p
                                id="cardDefinition"
                                onKeyDown={handleShowDefinition}
                                autoFocus
                                tabIndex={0}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ipsum odio optio
                                quae quo. Consequatur culpa dolores dolorum eligendi, facere ipsa laboriosam laudantium
                                modi obcaecati, optio recusandae repellat tempore, veritatis?
                            </p>
                        ) : (
                            <p
                                id="cardTerm"
                                onKeyDown={handleShowDefinition}
                                autoFocus
                                tabIndex={1}
                            >
                                What did Jadtales say about love?
                            </p>
                        )}

                        <Image src={ArrowRightIcon} alt="nextCard" width={80}/>
                    </div>
                </div>

                <div className="leftQuantityCards">
                    <Image src={LeftQuantityCardsIcon} alt="leftQuantityCards"/>3/8
                </div>

            </div>
            <br/>

            <div className="difficultyLearningProcess">
                <button className="difficultyLevel_again">Again</button>
                <hr/>
                <button className="difficultyLevel_hard">Hard</button>
                <hr/>
                <button className="difficultyLevel_good">Good</button>
                <hr/>
                <button className="difficultyLevel_easy">Easy</button>
            </div>
        </Fragment>)
}