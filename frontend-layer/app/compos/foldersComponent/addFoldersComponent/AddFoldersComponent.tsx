import {ReactElement, useState, useRef} from "react";
import {useRouter} from "next/navigation";

interface AddFolderComponentProps {
    userFolder: string[];
}

export default function AddFolderComponent({
                                               userFolder,
                                           }: AddFolderComponentProps): ReactElement {

    const [newFolder, setNewFolder] = useState<string>('');
    const [isAddingNewFolder, setIsAddingNewFolder] = useState<boolean>(false);

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Function to handle adding a new folder
    const handleAddingNewFolder = (): void => {
        if (newFolder.trim()) {
            // Prevent duplicate folder names
            if (!userFolder.includes(newFolder)) {
                userFolder.push(newFolder);
                setNewFolder('');
                setIsAddingNewFolder(false);
                // Navigate to the newly created folder
                router.push(`/home/${newFolder.trim().replaceAll(' ', '_')}`);
            }
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
        <>
            {!isAddingNewFolder ? (
                <span onClick={() => setIsAddingNewFolder(true)}>+</span>
            ) : (
                <>
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
                </>
            )}
        </>
    );
}
