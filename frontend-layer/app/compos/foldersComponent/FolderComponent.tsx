'use client';
import React, { ReactElement } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import './folderStyling.css';
import AddNoteComponentButton from '@/app/compos/AddNoteButtonCompo/AddNoteButtonComponent';
import AddFolderComponent from "@/app/compos/foldersComponent/addFoldersComponent/AddFoldersComponent";

export const userFolder: string[] = ['poetry', 'fiction'];

export default function FolderComponent(): ReactElement {
    const pathname = usePathname();
    const router = useRouter();

    // Set the current folder based on the pathname or default to the first folder
    const currentFolder = pathname.split('/').filter((url: string) => url !== '' && url !== 'home')[0] || userFolder[0];

    const handleCurrentOpenFolder = (folder: string): void => {
        // Update the URL when a folder is clicked
        router.push(`/home/${folder.replaceAll(' ', '_')}`);
    };

    return (
        <>
            <div className="folderContainer">
                <ul>
                    {userFolder.map((folder: string, index: number) => (
                        <Link
                            href={`/home/${folder.replaceAll(' ', '_')}`}
                            onClick={() => handleCurrentOpenFolder(folder)}
                            className={currentFolder === folder.replaceAll(' ', '_') ? 'active' : ''}
                            key={index}
                        >
                            {folder.charAt(0).toUpperCase() + folder.slice(1)}
                        </Link>
                    ))}
                    <li>
                        <AddFolderComponent userFolder={userFolder} />
                    </li>
                </ul>
            </div>

            <AddNoteComponentButton />
        </>
    );
}
    