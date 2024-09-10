'use client';
import React, {ReactElement, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import Link from 'next/link';
import './folderStyling.css';
import AddNoteComponentButton from '@/app/compos/AddNoteButtonCompo/AddNoteButtonComponent';
import AddFolderComponent from "@/app/compos/foldersComponent/addFoldersComponent/AddFoldersComponent";

export const userFolder: string[] = ['poetry', 'fiction'];

export default function FolderComponent(): ReactElement {
    const pathname: string[] = usePathname().split('/').filter((url: string) => url !== '' && url !== 'home');
    const router = useRouter();


    // Set the first folder as the default if no folder is present in the path
    const defaultFolder = userFolder[0];

    // states
    const [currentFolder, setCurrentFolder] = useState<string>(pathname[0] || defaultFolder);

    const [newFolder, setNewFolder] = useState<string>('');
    const [isAddingNewFolder, setIsAddingNewFolder] = useState<boolean>(false);

    // to add a new folder
    const handleAddingNewFolder = (): void => {
        if (newFolder.trim()) {

            // check if a similar folder exists
            if (!userFolder.includes(newFolder)) {
                setNewFolder('')
                setIsAddingNewFolder(false)
                userFolder.push(newFolder)
                router.push(`/home/${newFolder.replaceAll(' ', '_')}`);
            }
        } else {

        }
    }

    // Redirect to the first folder if the user is visiting '/home' without a folder in the path
    useEffect(() => {
        if (!pathname.length) {
            router.push(`/home/${defaultFolder}`);
        } else {
            setCurrentFolder(pathname[0]);
        }
    }, [pathname, router, defaultFolder]);

    const handleCurrentOpenFolder = (folder: string): void => {
        setCurrentFolder(folder);
    };

    return (
        <>
            <div className="folderContainer">
                <ul>
                    {userFolder.map((folder: string, index: number) => {
                        return (
                            <Link
                                href={`/home/${folder.replaceAll(' ', '_')}`}
                                onClick={() => handleCurrentOpenFolder(folder)}
                                className={currentFolder === folder.replaceAll(' ', '_') ? 'active' : ''}
                                key={index}
                            >
                                {folder.charAt(0).toUpperCase() + folder.slice(1)}
                            </Link>
                        );
                    })}
                    <li>
                        <AddFolderComponent
                            newFolder={newFolder}
                            setNewFolder={setNewFolder}
                            isAddingNewFolder={isAddingNewFolder}
                            setIsAddingNewFolder={setIsAddingNewFolder}
                            handleAddingNewFolder={handleAddingNewFolder}
                        />
                    </li>
                </ul>
            </div>


            <AddNoteComponentButton/>
        </>
    );
}
