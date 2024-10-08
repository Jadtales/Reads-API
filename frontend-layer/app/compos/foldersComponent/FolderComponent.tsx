'use client';
import React, {Fragment, ReactElement, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import './folderStyling.css';

import AddNoteComponentButton from '@/app/compos/AddNoteButtonCompo/AddNoteButtonComponent';
import AddFolderComponent from "@/app/compos/foldersComponent/addFoldersComponent/AddFoldersComponent";
import filterIcon from "@/public/icons/filter-3-line.svg"
import FilterComponent from "@/app/compos/FilterFunctionality/FilterComponent";

export const existedFolders: string[] = ['unspecified', 'poetry', 'fiction'
];

export default function FolderComponent(): ReactElement {
    const [isFilterActive, setFilter] = useState<boolean>(false);

    const pathname = usePathname();
    const router = useRouter();

    const handleFilterButtonClick = (): void => {
        setFilter(!isFilterActive)
    }
    // Set the current folder based on the pathname or default to the first folder
    const currentFolder = pathname.split('/').filter((url: string) => url !== '' && url !== 'home')[0] || existedFolders[0];

    const handleCurrentOpenFolder = (folder: string): void => {
        // Update the URL when a folder is clicked
        router.push(`/home/${folder.replaceAll(' ', '_')}`);
    };

    return (
        <Fragment>
            <div className="folderContainer">
                <div className="folders-section">
                    <ul>
                        {existedFolders.map((folder: string, index: number) => (
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
                            <AddFolderComponent existedFolders={existedFolders}/>
                        </li>
                    </ul>

                    <div className={'filterIcon'}
                         onClick={() => handleFilterButtonClick()}>
                        <Image src={filterIcon} alt="filter notes" width={25}/>
                    </div>
                </div>

                {isFilterActive && <FilterComponent/>}

            </div>

            <AddNoteComponentButton/>
        </Fragment>
    );
}
    