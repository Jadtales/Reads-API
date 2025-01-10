'use client'
import {ReactElement, useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import './bookReviewPageStyling.css'

import NoteCardReview from "@/app/compos/notecard-components-review-page/NotecardReviewComponent";
import ListOfContentComponent from "@/app/compos/notecard-components-review-page/ListOfContentComponent";
import AdvancedSettingsModal from "@/app/compos/modals/advanced-settings-modal/AdvancedSettingsModal";

import GoBackToHomePageIcon from '@/public/icons/goBackIcon.svg'
import ScrollingFuncs from "@/app/compos/notecard-components-review-page/ScrollingFuncs";
import Link from "next/link";

export default function BookReviewer(): ReactElement<any> {
    const [windowInnerWidth, setWindowInnerWidth] = useState<number>(window.innerWidth);

    const router = useRouter()
    const pathname = usePathname()

    const getNoteCardTitle = pathname.split("/").at(2)?.replaceAll('-', ' ').slice(0, -2)

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
                <Link href={`/highlightsreview/${getNoteCardTitle}/learn`} className={'switchToMemoMode'}
                      style={{color: 'black', textDecoration: 'none'}}>Switch to memoriation mode</Link>

                <AdvancedSettingsModal/>
            </div>}

            <div className="noteCardsHighlightsContainer">
                <ScrollingFuncs/>
                <div className="topLayer">
                    <Image src={GoBackToHomePageIcon}
                           alt="goBackToHomePage"
                           width={35}
                           id="goBackToHomePageIcon"
                           onClick={() => router.back()}/>

                    <h1 id="noteCardTitle">{getNoteCardTitle}</h1>


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
            </div>

        </div>
    )
}