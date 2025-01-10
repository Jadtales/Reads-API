import {ReactElement, useState} from "react";
import Image from "next/image";
import './selectedNoteCards-highlightsModal-Styling.css'

interface ComponentProps {
    bookTitle: string;
    bookAuthor: string;
    highlightsQuantity: number;
    isNotecardSelected: boolean;
    onSelect: () => void;
}

import BookIcon from '@/public/icons/book-line.svg'

export default function SelectedNotecardComponent({
                                                      bookTitle,
                                                      bookAuthor,
                                                      highlightsQuantity,
                                                      onSelect,
                                                      isNotecardSelected
                                                  }: ComponentProps): ReactElement<HTMLDivElement> {

    return <div className={isNotecardSelected ? 'kindleNoteCardContainer-active' : 'kindleNoteCardContainer'}
                onClick={onSelect}>
        <Image src={BookIcon} alt={'book'}/>
        <div className={'authorNameAndBook'}>
            <h3 className={'bookTitle'}>{bookTitle}</h3>
            <span className={'bookAuthor'}>by - {bookAuthor}</span>
            {/*<hr style={{width: '100%', margin: '5px 0'}}/>*/}
        </div>

        <div className="otherInfos">
            <span className="highlightsQuantity">
                Number of highlights ({highlightsQuantity})
            </span>
        </div>
    </div>
}