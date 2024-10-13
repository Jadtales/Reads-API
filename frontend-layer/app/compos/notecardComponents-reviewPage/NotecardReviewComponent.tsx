import {ReactElement, useEffect, useRef, useState} from "react";
import Image from "next/image";
import './noteCardReviewComponentStyling.css'
import ShareStatsModal from "@/app/compos/statsComponents/share-statsIcon-component/ShareStatsModal";

// imported icons
import EditNoteCardIcon from '@/public/icons/pencil-line.svg'
import StarIcon from '@/public/icons/staredIcon.svg'
import FilledStaredIcon from '@/public/icons/filledStaredIcon.svg'
import ArrowDownIcon from '@/public/icons/arrowDownIcon.svg'
import SaveIcon from '@/public/icons/check-line.svg'
import AiIcon from '@/public/icons/AiIcon.svg'

interface NotecardReviewPageProps {
    noteCardContent: string;
    noteCardTitle?: string;
}

export default function NoteCardReview({noteCardContent, noteCardTitle}: NotecardReviewPageProps): ReactElement {
    const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
    const [isNoteCardStared, setIsNoteCardStared] = useState<boolean>(false);
    const [content, setContent] = useState<string>(noteCardContent);

    const editableRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        // Focus on the content when entering edit mode
        if (isEditModeActive && editableRef.current) {
            editableRef.current.focus();
        }
    }, [isEditModeActive]);

    const handleSaveContent = (): void => {
        if (editableRef.current) {
            setContent(editableRef.current.innerText); // Save the edited text
        }
        setIsEditModeActive(false); // Exit edit mode
    };

    const handleStaringIcon = (): void => {
        setIsNoteCardStared(!isNoteCardStared);
    }

    return (
        <div className="noteCardReviewPageContainer">
            <div className="content_moreOptions">
                <p
                    ref={editableRef}
                    contentEditable={isEditModeActive}
                    suppressContentEditableWarning={true} // Prevent React warning for contentEditable
                    className={isEditModeActive ? "editable active" : "editable"}
                    id="noteCardReviewContent"
                >
                    {content}
                </p>
                <Image src={ArrowDownIcon} alt="moreOptions" id="moreOptions"/>
            </div>

            <div className="editingToolsLayer">
                <Image src={isNoteCardStared ? FilledStaredIcon : StarIcon} alt="starNoteCard" id="starIcon"
                       onClick={handleStaringIcon}/>
                <Image src={AiIcon} alt="useAi"/>
                <Image
                    src={isEditModeActive ? SaveIcon : EditNoteCardIcon}
                    alt="editNoteCard"
                    id="editIcon"
                    onClick={() => {
                        if (isEditModeActive) {
                            handleSaveContent(); // Save when exiting edit mode
                        } else {
                            setIsEditModeActive(true); // Enter edit mode
                        }
                    }}
                />
                <ShareStatsModal
                    whoShared="jadtales"
                    sharedTypeOfContent="Highlight"
                    sharedContent={content}
                />
            </div>
        </div>
    );
}