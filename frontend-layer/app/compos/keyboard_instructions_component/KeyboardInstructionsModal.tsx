import ReactDOM from "react-dom";

// imported icons
import RightToIcon from '@/public/icons/rightTo.svg'
import LeftToIcon from '@/public/icons/leftTo.svg'
import Image from "next/image";
import {useState} from "react";
import KeyboardIcon from "@/public/icons/keyboard-line.svg";
import ClosingIcon from '@/public/icons/notesIcons/close-line.svg';
import './keyboardInstructionsStyling.css'

export default function KeyboardInstructionsModal() {
    const [isKeyboardClicked, setIsKeyboardClicked] = useState<boolean>(false);

    return ReactDOM.createPortal((
        isKeyboardClicked ?
            <div className="keyboardInstructionsBackground">
                <div className="keyboardInstructionsContainer">
                    <div className="closeKeyboardInstructionsModal">
                        <h1>Keyboard Shortcuts</h1>
                        <Image src={ClosingIcon}
                               alt="closingKeyboardInstructions"
                               width={30}
                               onClick={() => setIsKeyboardClicked(!isKeyboardClicked)}/>
                    </div>

                    <div className="difficultyLevelKeys">
                        <h1>To submit Difficulty level</h1>
                        <div className="keys">
                            <span className="againKey">1 | A</span>
                            <span className="hardKey">2 | H</span>
                            <span className="goodKey">3 | G</span>
                            <span className="easyKey">4 | E</span>
                        </div>
                    </div>

                    <div className="nextPreviousCards">
                        <h1>Go to/back next or previous cards</h1>
                        <div className="keys">
                            <span className="rightArrowkey"><Image src={RightToIcon} alt="nextCard"/></span>
                            <span className="rightArrowkey"><Image src={LeftToIcon} alt="previousCard"/></span>
                        </div>
                    </div>

                    <div className="switchTermDefinition">
                        <h1>View Definition or Term</h1>
                        <div className="keys">
                            <span className="spaceBarKey">Space bar</span>
                        </div>
                    </div>
                </div>
            </div> : <div className="keyboardInstructions" onClick={() => setIsKeyboardClicked(!isKeyboardClicked)}>
                <Image src={KeyboardIcon} alt="keyboardInstruction" width={40}/>
            </div>
    ), document.getElementById("modalsSection") as HTMLDivElement);
}