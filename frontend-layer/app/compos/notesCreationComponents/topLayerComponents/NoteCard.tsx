'use client'

import {ChangeEvent, ReactElement, useRef, useState} from "react";
import Image from "next/image";
import '../notesCreationCompoStyling.css'

import AiIcon from '@/public/icons/notesIcons/sparkling-fill.svg'
import UpArrowIcon from '@/public/icons/notesIcons/arrow-up-line.svg'
import DownArrowIcon from '@/public/icons/notesIcons/arrow-down-line.svg'
import DeleteCardIcon from '@/public/icons/notesIcons/close-line.svg'

interface cardProps {
    cardKey: number;
    cardTitle?: string;
    cardDescription?: string;
    onDelete: (key: number) => void;
}

const editingTools = [
    {name: 'Bold', icon: '/icons/notesIcons/bold.svg'},
    {name: 'Italic', icon: '/icons/notesIcons/italic.svg'},
    {name: 'Underline', icon: '/icons/notesIcons/underline.svg'},
    {name: 'BulletPoints', icon: '/icons/notesIcons/list-unordered.svg'},
    {name: 'NumberedListIcon', icon: '/icons/notesIcons/list-ordered.svg'},
    {name: 'HighlighterIcon', icon: '/icons/notesIcons/quill-pen-fill.svg'},
];

export default function NoteCard({cardKey, cardTitle, cardDescription, onDelete}: cardProps): ReactElement {
    // ---- NoteCard editing tools work section
    const [isEditingToolActive, setIsEditingToolActive] = useState<string[]>([]);
    const [cardInputFields, setInputFieldValues] = useState<{ term: string, definition: string }>(
        {
            term: '',
            definition: ''
        }
    )

    const termDivRef = useRef<HTMLDivElement>(null);
    const definitionDivRef = useRef<HTMLDivElement>(null);

    const handleEditingToolActivityCheck = (toolName: string): void => {
        if (isEditingToolActive?.includes(toolName)) {
            setIsEditingToolActive(isEditingToolActive.filter((tool) => {
                return tool !== toolName
            }))
        } else {
            setIsEditingToolActive([...isEditingToolActive, toolName])
        }
    }


    const handleInputsChange = (event: ChangeEvent<HTMLDivElement>, whichInputField: 'term' | 'definition'): void => {
        const content: string = event.currentTarget.innerText;

        setInputFieldValues((prevState) => ({
            ...prevState,
            [whichInputField]: content,
        }));
    }

    return (
        <div className="noteCardContainer">
            <div className="noteCardEditing">
                <span className="cardKey">{cardKey}</span>

                <div className="editingToolsContainer">
                    <div className="cardEditingTools">
                        <ul>

                            {editingTools.map((tool, key) => (
                                <li key={key}
                                    onClick={() => handleEditingToolActivityCheck(tool.name)}>
                                    <Image src={tool.icon}
                                           alt={tool.name}
                                           width={25}
                                           height={25}/></li>
                            ))}
                        </ul>
                    </div>

                    <div className="otherCardEditingOptions">
                        <ul>
                            <li><Image src={AiIcon} alt={"useAi"}/></li>
                            <li><Image src={UpArrowIcon} alt={"moveCardUp"}/></li>
                            <li><Image src={DownArrowIcon} alt={"moveCardDown"}/></li>
                            <li className="deleteButton"
                                onClick={() => onDelete(cardKey)}><Image src={DeleteCardIcon} alt={"deleteCard"}/></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="term_description_layer">
                <div className="term">
                    <div className={'termTextarea'}>
                        <div id="termInputField"
                             ref={termDivRef}
                            // onFocus={handleTermInputFieldOnFocus}
                             autoFocus
                             data-placeholder={'Chapter number/name'}
                             contentEditable={true}
                             suppressContentEditableWarning={true} // Suppress React warning for contentEditable
                             onBlur={(event) => handleInputsChange(event, 'term')}>

                            {cardInputFields.term}
                        </div>
                    </div>
                    <h1>Term</h1>
                </div>

                <div className="description">
                    <div className={'termTextarea'}>
                        <div
                            id="definitionInputField"
                            ref={definitionDivRef}
                            contentEditable
                            autoFocus
                            data-placeholder={'Your highlights/notes on the chapter'}
                            suppressContentEditableWarning={true} // Suppress React warning for contentEditable
                            onBlur={(event) => handleInputsChange(event, 'definition')}
                        >
                            {cardInputFields.definition}
                        </div>
                    </div>
                    <h1>Description</h1>
                </div>
            </div>
        </div>
    )
}