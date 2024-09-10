import { ReactElement } from "react";

interface AddFolderComponentProps {
    newFolder: string;
    setNewFolder: (folderName: string) => void;
    isAddingNewFolder: boolean;
    setIsAddingNewFolder: (isAdding: boolean) => void;
    handleAddingNewFolder: () => void;
}

export default function AddFolderComponent({
                                               newFolder,
                                               setNewFolder,
                                               isAddingNewFolder,
                                               setIsAddingNewFolder,
                                               handleAddingNewFolder,
                                           }: AddFolderComponentProps): ReactElement {
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
                        onChange={(e) => setNewFolder(e.target.value)}
                        placeholder="New folder name"
                    />
                    <button onClick={handleAddingNewFolder}>Add</button>
                    <button onClick={() => setIsAddingNewFolder(false)}>Cancel</button>
                </>
            )}
        </>
    );
}
