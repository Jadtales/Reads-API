import '../notesCreationCompoStyling.css'
import React, {ReactElement, useRef, useState} from 'react';

export default function NoteDescriptionAndTitleComponent(): { tagsElement: ReactElement<any>, noteCardTags: string[] } {
    const [noteCardTags, setNoteCardTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>('');
    const noteTagsRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTag(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter' && newTag.trim() !== '') {
            setNoteCardTags((prevTags) => [...prevTags, newTag.trim()]);
            setNewTag(''); // Clear the input field
        }
    };

    const handleRemoveTag = (index: number): void => {
        setNoteCardTags((prevTags) => prevTags.filter((_, i) => i !== index));
    };

    const tagsElement = (
        <div className="noteDescriptionAndTitleComponentContainer">
            {/* Title Section */}
            <div className="noteTitle">
                <h1>Title</h1>
                <input type="text" placeholder="Enter the book title"/>
            </div>

            {/* Description and Tags Section */}
            <div className="noteDescription">
                <h1>Description and Tags</h1>
                <input type="text" placeholder="Write your description"/>

                <div className="noteTags">
                    {noteCardTags.map((tag: string, index: number) => (
                        <button key={index} className="tagButton">
                            #{tag.at(0)?.toUpperCase()+ tag.substring(1)}
                            <span
                                className="removeTag"
                                onClick={() => handleRemoveTag(index)}
                                style={{marginLeft: '8px', cursor: 'pointer'}}
                            >
                                &times;
                            </span>
                        </button>
                    ))}

                    <input
                        ref={noteTagsRef}
                        type="text"
                        value={newTag}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="New Tag +"
                    />
                </div>
            </div>
        </div>
    );
    return {
        tagsElement,
        noteCardTags
    }
}
