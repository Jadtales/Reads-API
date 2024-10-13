'use client'
import {ReactElement, useState} from "react";
import './bookReviewPageStyling.css'

import BrainIcon from '@/public/icons/brainIcon.svg'
import ReviewNoteCardsModeIcon from '@/public/icons/reviewNotecardsMode.svg'
import Image from "next/image";
import NoteCardReview from "@/app/compos/notecardComponents-reviewPage/NotecardReviewComponent";
import GoBackToHomePageIcon from '@/public/icons/goBackIcon.svg'
import {usePathname, useRouter} from "next/navigation";
import NoteCardMemorize from "@/app/compos/notecardComponents-reviewPage/NoteCardMemorizationComponent";
import KeyboardInstructionsModal from "@/app/compos/keyboard_instructions_component/KeyboardInstructionsModal";

export default function BookReviewer(): ReactElement {
    const [isMemorizationModeActive, setIsMemorizationModeActive] = useState<boolean>(false)

    const router = useRouter()
    const pathname = usePathname()

    const getNoteCardTitle = pathname.split("/").at(2).replaceAll('_', ' ')

    return (
        <div className="reviewingSectionContainer">
            <div className="reviewingSection">
                <div className="topLayer">
                    {/*<GoBackToComponent/>*/}
                    <Image src={GoBackToHomePageIcon}
                           alt="goBackToHomePage"
                           width={50}
                           id="goBackToHomePageIcon"
                           onClick={() => router.back()}/>
                    <h1 id="noteCardTitle">{getNoteCardTitle}</h1>

                    <Image src={isMemorizationModeActive ? ReviewNoteCardsModeIcon : BrainIcon} alt="switchToMemoMode"
                           width={25} id="switchToMemoModeIcon"
                           onClick={() => setIsMemorizationModeActive(!isMemorizationModeActive)}/>
                </div>
            </div>


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