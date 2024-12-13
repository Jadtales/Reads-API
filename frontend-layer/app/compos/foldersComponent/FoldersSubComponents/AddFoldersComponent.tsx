import {ReactElement, useState, useRef, Fragment} from "react";
import {useRouter} from "next/navigation";
import '../folderStyling.css'

interface AddFolderComponentProps {
    existedFolders: string[];
}

// imported modules
import {FoldersErrorHandling} from "@/utils/ErrorHandling/foldersErrorHandling";
import useWarningNotification from "@/app/compos/modals/warningNotificationModal/WarningNotification";


export default function AddFolderComponent({
                                               existedFolders,
                                           }: AddFolderComponentProps): ReactElement {

    const {toggleElementActivation, warningFunction} = useWarningNotification()

    const [newFolder, setNewFolder] = useState<string>('');
    const [isAddingNewFolder, setIsAddingNewFolder] = useState<boolean>(false);

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Function to handle adding a new folder
    const handleAddingNewFolder = (): void => {
        const folderLongError = FoldersErrorHandling.isFolderLong(newFolder.trim())
        if (folderLongError) {
            toggleElementActivation(true)
            return
        }

        if (newFolder.trim() && !existedFolders.includes(newFolder)) {
            existedFolders.push(newFolder);
            setNewFolder('');
            setIsAddingNewFolder(false);
            // Navigate to the newly created folder
            router.push(`/home/${newFolder.trim().replaceAll(' ', '-')}`);

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
                <span onClick={() => setIsAddingNewFolder(true)}
                      style={{color: 'black', margin: '0 12px', cursor: 'pointer'}}>+</span>
            ) : (
                <input
                    id="addFolderInputField"
                    type="text"
                    maxLength={20}
                    minLength={1}
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
            )}
            {newFolder.length > 20 && warningFunction('Folder name must be under 20 characters')}
        </Fragment>
    );
}
