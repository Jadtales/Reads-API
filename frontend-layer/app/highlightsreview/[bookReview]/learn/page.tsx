'use client';
import './learnModeStyling.css'

import NoteCardMemorizationComponent from "@/app/compos/notecard-components-review-page/NoteCardMemorizationComponent";
import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import Image from "next/image";
import ReviewNoteCardsModeIcon from '@/public/icons/reviewNotecardsMode.svg'

import KeyboardInstructionsModal
    from "@/app/compos/user-instructions/keyboard_instructions_component/KeyboardInstructionsModal";
import {useRouter} from "next/navigation";

const LearnMode = () => {

    const router = useRouter();


    return (
        <div className={'learnModeContainer'}>
            <div className="quickTools">
                <GoBackToComponent withText={false} iconSize={'25px'}/>
                <button className="switchToReviewMode" onClick={() => router.back()}>
                    <Image src={ReviewNoteCardsModeIcon} alt={'go-to-review-mode'}/>
                </button>
            </div>
            <NoteCardMemorizationComponent/>
            <KeyboardInstructionsModal/>
        </div>


    );
};
export default LearnMode;