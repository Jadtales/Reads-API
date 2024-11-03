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
    cardTitle: string;
    cardDefinition: string;
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

export default function NoteCard({cardKey, cardTitle, cardDefinition, onDelete}: cardProps): ReactElement {
    // ---- NoteCard editing tools work section
    const [isEditingToolActive, setIsEditingToolActive] = useState<string[]>([])
    const handleEditingToolActivityCheck = (toolName: string): void => {
        if (isEditingToolActive?.includes(toolName)) {
            setIsEditingToolActive(isEditingToolActive.filter((tool) => {
                return tool !== toolName
            }))
        } else {
            setIsEditingToolActive([...isEditingToolActive, toolName])
        }
    }


    // --- Captures Term, Definition input fields
    const [cardInputFields, setInputFieldValues] = useState<{
        term: string, definition: string
    }>({term: '', definition: ''})
    const filledInputs = (event: ChangeEvent<HTMLInputElement>, whichInputField: 'term' | 'definition'): void => {
        setInputFieldValues((prevState) => ({
            ...prevState,
            [whichInputField]: event.target.value, // Dynamically set the field
        }));
    }

    // --- Empties the div inner text when the user starts typing
    const divInnerTextRef = useRef<HTMLDivElement>(null);
    const handleTermInputFieldOnFocus = () => {
        if(!cardInputFields.term && divInnerTextRef.current){
            divInnerTextRef.current.innerText = ''
        }
    }

    const handleTermInputFieldOnBlur = () => {
        if(cardInputFields.term && divInnerTextRef.current.innerText.length > 0){
            setInputFieldValues({
                ...cardInputFields,
                term: divInnerTextRef.current.innerText,
            })
        }
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
                             ref={divInnerTextRef}
                             onFocus={handleTermInputFieldOnFocus}
                             onBlur={handleTermInputFieldOnBlur}
                             autoFocus
                             contentEditable={true}
                             onInput={(event) => filledInputs(event, 'term')}>

                            {cardInputFields.term?.length > 0 ? cardInputFields.term : cardTitle}
                        </div>
                    </div>
                    <h1>Term</h1>
                </div>

                <div className="description">
                    <div className={'termTextarea'}>
                        {/*{isCardInputFieldActive.isDefinitionActive &&*/}
                        <div
                            id="definitionInputField"
                            autoFocus={true}
                            contentEditable={true}
                            suppressContentEditableWarning={true} // Suppress React warning for contentEditable
                            onInput={(event) => filledInputs(event, 'definition')}
                        >
                            {/* Display definition if it has content, otherwise show 'test' */}
                            {cardInputFields.definition?.length > 0 ? cardInputFields.definition : cardDefinition}
                        </div>
                        {/*}*/}
                    </div>

                    <h1>Description</h1>
                </div>
            </div>
        </div>
    )
}