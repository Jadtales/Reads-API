'use client'

import {ChangeEvent, ReactElement, useState} from "react";
import Image from "next/image";
import '../notesCreationCompoStyling.css'

import AiIcon from '@/public/icons/notesIcons/sparkling-fill.svg'
import UpArrowIcon from '@/public/icons/notesIcons/arrow-up-line.svg'
import DownArrowIcon from '@/public/icons/notesIcons/arrow-down-line.svg'
import DeleteCardIcon from '@/public/icons/notesIcons/close-line.svg'

interface cardProps {
    cardKey: number;
    cardTitle: string;
    cardDescription: string;
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


    // ---- Term & Definition work section
    const [isCardInputFieldActive, setTerm] = useState<{
        isTermActive: boolean, isDefinitionActive: boolean
    }>({isTermActive: false, isDefinitionActive: false})

    const [cardInputFields, setInputFieldValues] = useState<{
        term: string, definition: string
    }>({term: '', definition: ''})

    const isInputFieldFocused = (whatInputFieldIsActive: 'term' | 'definition'): void => {

        setTerm((prevState) => {
            if (whatInputFieldIsActive === "term") {
                return {
                    ...prevState,
                    isTermActive: !prevState.isTermActive,  // Toggle term focus
                };
            } else if (whatInputFieldIsActive) {
                return {
                    ...prevState,
                    isDefinitionActive: !prevState.isDefinitionActive,  // Toggle definition focus
                };
            }
            return prevState;
        });
    }

    const filledInputs = (event: ChangeEvent<HTMLInputElement>, whichInputField: 'term' | 'definition'): void => {
        setInputFieldValues((prevState) => ({
            ...prevState,
            [whichInputField]: event.target.value, // Dynamically set the field
        }));
    }

    return (
        <div className="noteCardContainer">
            <div className="noteCardEditing">
                <span className="cardkey">{cardKey}</span>

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

            <div className="term_description_layer">
                <div className="term">
                    <div className={isCardInputFieldActive.isTermActive ? 'termTextarea-active' : 'termTextarea'}
                         onClick={() => isInputFieldFocused('term')}>
                        {isCardInputFieldActive.isTermActive ?
                            (<input id="termInputField"
                                    type="text"
                                    autoFocus
                                    defaultValue={cardInputFields.term.length > 1 ? cardInputFields.term : ''}
                                    value={cardInputFields.term}
                                    onChange={() => filledInputs(event, 'term')}
                            />) : (<p>{cardInputFields.term.length > 1 ? cardInputFields.term : (
                                <span>{cardTitle}</span>)}</p>)}
                    </div>
                    <h1>Term</h1>
                </div>

                <div className="description">
                    <div className={isCardInputFieldActive.isDefinitionActive ? 'termTextarea-active' : 'termTextarea'}
                         onClick={() => isInputFieldFocused('definition')}>
                        {isCardInputFieldActive.isDefinitionActive ?
                            (<input id="definitionInputField"
                                    type="text"
                                    autoFocus
                                    defaultValue={cardInputFields.definition.length > 1 ? cardInputFields.definition : ''}
                                    value={cardInputFields.definition}
                                    onChange={() => filledInputs(event, 'definition')}
                            />) : (<p>{cardInputFields.definition.length > 1 ? cardInputFields.definition : (
                                <span>Your highlights/notes on the chapter</span>)}</p>)}
                    </div>

                    <h1>Description</h1>
                </div>
            </div>
        </div>
    )
}