import {ReactElement, useState, useRef, Fragment} from "react";
import {useRouter} from "next/navigation";

interface AddFolderComponentProps {
    existedFolders: string[];
}

// imported modules
import {FoldersErrorHandling} from "@/utils/ErrorHandling/foldersErrorHandling";


export default function AddFolderComponent({
                                               existedFolders,
                                           }: AddFolderComponentProps): ReactElement {

    const [newFolder, setNewFolder] = useState<string>('');
    const [isAddingNewFolder, setIsAddingNewFolder] = useState<boolean>(false);
    const [folderErrorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Function to handle adding a new folder
    const handleAddingNewFolder = (): void => {
        const folderLongError = FoldersErrorHandling.isFolderLong(newFolder.trim())
        if (folderLongError) {
            setErrorMessage(folderLongError)
            return
        }

        if (newFolder.trim() && !existedFolders.includes(newFolder)) {
            existedFolders.push(newFolder);
            setNewFolder('');
            setIsAddingNewFolder(false);
            // Navigate to the newly created folder
            router.push(`/home/${newFolder.trim().replaceAll(' ', '_')}`);

        } else {
            setIsAddingNewFolder(false);
        }
    };

    // Handle key presses (Enter to add, Escape to cancel)
    const handleKeyDown = (keyboard: React.KeyboardEvent<HTMLInputElement>) => {
        if (keyboard.key === 'Enter') {
            handleAddingNewFolder();
        } else if (keyboard.key === 'Escape') {
            setIsAddingNewFolder(false);
        }
    };

    return (
        <Fragment>
            {!isAddingNewFolder ? (
                <span onClick={() => setIsAddingNewFolder(true)} style={{color: 'black'}}>+</span>
            ) : (
                <Fragment>
                    <input
                        id="addFolderInputField"
                        type="text"
                        autoFocus
                        value={newFolder}
                        ref={inputRef}
                        onChange={(e) => setNewFolder(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={() => {
                            if (newFolder.trim()) {
                                handleAddingNewFolder()
                            }

                            !newFolder.trim() && setIsAddingNewFolder(false)
                        }}
                        placeholder="New folder name"
                    />

                </Fragment>
            )}
            {newFolder.length > 20 && folderErrorMessage && (<p id="errorMessageStyling">{folderErrorMessage}</p>)}

        </Fragment>
    );
}
