'use client'

import {Fragment, ReactElement, KeyboardEvent as ReactKeyboardEvent, useEffect, useState, useRef} from "react";
import Image from "next/image";
import './noteCardReviewComponentStyling.css'

// imported icons
import ArrowLeftIcon from '@/public/icons/leftTo.svg'
import ArrowRightIcon from '@/public/icons/rightTo.svg'
import LeftQuantityCardsIcon from '@/public/icons/leftQuantityCardsIcon.svg'
import DifficulyProgressChoice from "@/app/compos/memorization-mode/DifficulyProgressChoice";

interface NoteCardMemorizationProps {
    duesCards: number;
    newCards: number;
    cards: { term: string, definition: string }[];
}

export default function NoteCardMemorizationComponent(): ReactElement<any> {
    const [showDefinition, setShowDefinition] = useState<boolean>(false);
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const handleShowDefinition = (event: ReactKeyboardEvent): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            setShowDefinition(!showDefinition);
        }
    };

    const handleNextPreviousCardsChange = (event: ReactKeyboardEvent): void => {
        if (event.key === 'arrowLeft') {

        }
    }

    const handleCardMemorizationDifficulty = (event: ReactKeyboardEvent): void => {
        if (event.key === '1' || event.key === 'a') {

        }
    }

    useEffect(() => {
        const handleDifficultyLearningSubmission = (event: KeyboardEvent): void => {
            const anyButtonIsFocused = buttonsRef.current.some(button => {
                return button?.classList?.contains('chosenDifficultyLevel');
            });

            if (event.key === 'f' || event.key === '1') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[0]?.classList.add('chosenDifficultyLevel')
            } else if (event.key === 'u' || event.key === '2') {
                if (anyButtonIsFocused) return;

                buttonsRef.current[1]?.classList.add('chosenDifficultyLevel')
            } else if (event.key === 'g' || event.key === '3') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[2]?.classList.add('chosenDifficultyLevel')
            } else if (event.key === 'p' || event.key === '4') {
                if (anyButtonIsFocused) return;
                buttonsRef.current[3]?.classList.add('chosenDifficultyLevel')
            }
        }

        if (typeof document !== 'undefined') {
            document.addEventListener('keydown', handleDifficultyLearningSubmission);
        }

        return () => {
            if (typeof document !== 'undefined') {
                document.removeEventListener('keydown', handleDifficultyLearningSubmission);
            }
        }
    })

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

                <DifficulyProgressChoice buttonsRef={buttonsRef}/>
            </div>

        </Fragment>)
}