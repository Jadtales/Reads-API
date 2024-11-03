'use client'
import {ReactElement, useEffect, useState} from "react";
import './bookReviewPageStyling.css'

import BrainIcon from '@/public/icons/brainIcon.svg'
import ReviewNoteCardsModeIcon from '@/public/icons/reviewNotecardsMode.svg'
import Image from "next/image";
import NoteCardReview from "@/app/compos/notecardComponents-reviewPage/NotecardReviewComponent";
import GoBackToHomePageIcon from '@/public/icons/goBackIcon.svg'
import {usePathname, useRouter} from "next/navigation";
import NoteCardMemorize from "@/app/compos/notecardComponents-reviewPage/NoteCardMemorizationComponent";
import KeyboardInstructionsModal from "@/app/compos/keyboard_instructions_component/KeyboardInstructionsModal";
import ListOfContentComponent from "@/app/compos/notecardComponents-reviewPage/ListOfContentComponent";

export default function BookReviewer(): ReactElement {
    const [isMemorizationModeActive, setIsMemorizationModeActive] = useState<boolean>(false)
    const [windowInnerWidth, setWindowInnerWidth] = useState<number>(window.innerWidth);

    const router = useRouter()
    const pathname = usePathname()

    const getNoteCardTitle = pathname.split("/").at(2)?.replaceAll('-', ' ')

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(debounceTimer)

            debounceTimer = setTimeout(() => {
                setWindowInnerWidth(window.innerWidth)
            }, 200)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return (
        <div className="reviewingSectionContainer">
            <ListOfContentComponent
                contentList={['lorem', 'maybe thats why', 'consectetur adipisicing elit', 'fuga illo illum iste']}/>


            {windowInnerWidth > 800 && <div className={'test'}>
                <span className="switchToMemoMode"
                      onClick={() => setIsMemorizationModeActive(!isMemorizationModeActive)}>Switch to memorization mode</span>
                <span className="advancedSettingsSpan">Advanced settings</span>
            </div>}

            {isMemorizationModeActive ?
                <div className="noteCardsMemoModeContainer">
                    <div className="memoMode">
                        <div className="quickTools">
                            <Image src={GoBackToHomePageIcon}
                                   alt="goBackToHomePage"
                                   width={50}
                                   id="goBackToHomePageIcon"
                                   onClick={() => router.back()}/>

                            <Image src={isMemorizationModeActive ? ReviewNoteCardsModeIcon : BrainIcon}
                                   alt="switchToMemoMode"
                                   width={25} id="switchToMemoModeIcon"
                                   onClick={() => setIsMemorizationModeActive(!isMemorizationModeActive)}/>
                        </div>
                        <NoteCardMemorize key={2}/>
                    </div>
                    <KeyboardInstructionsModal/>
                </div>

                : <div className="noteCardsHighlightsContainer">
                    <div className="topLayer">
                        <Image src={GoBackToHomePageIcon}
                               alt="goBackToHomePage"
                               width={35}
                               id="goBackToHomePageIcon"
                               onClick={() => router.back()}/>

                        <h1 id="noteCardTitle">{getNoteCardTitle.slice(0, -2)}</h1>


                    </div>

                    <NoteCardReview
                        noteCardContent={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae soluta.\n'}/>
                    <NoteCardReview
                        noteCardContent={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae soluta.\n'}/>

                    <NoteCardReview
                        noteCardContent={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae soluta.\n'}/>
                    <NoteCardReview
                        noteCardContent={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae soluta.\n'}/>
                    <NoteCardReview
                        noteCardContent={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae soluta.\n'}/>
                    <NoteCardReview
                        noteCardContent={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae solutaLorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                            'Ab aliquam aut cupiditate exercitationem illum iusto minus perspiciatis ' +
                            'placeat, quam quasi? Aspernatur beatae debitis et, fuga illo illum iste ' +
                            'recusandae soluta.\n'}/>
                </div>}
        </div>
    )
}