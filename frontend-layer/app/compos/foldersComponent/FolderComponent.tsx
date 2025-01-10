'use client';
import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './folderStyling.css';

import AddNoteComponentButton from '@/app/compos/AddNoteButtonCompo/AddNoteButtonComponent';
import AddFolderComponent from '@/app/compos/foldersComponent/FoldersSubComponents/AddFoldersComponent';
import filterIcon from '@/public/icons/filter-3-line.svg';
import GoUpIcon from '@/public/icons/notesIcons/arrow-up-line.svg';
import FilterComponent from '@/app/compos/FilterFunctionality/FilterComponent';

import FoldersStateManagerContext from '@/app/wideStateManagement/FoldersState';

export default function FolderComponent(): ReactElement<any> {
    const [isFilterActive, setFilter] = useState<boolean>(false);
    const folders = useContext(FoldersStateManagerContext);

    const pathname = usePathname();
    const router = useRouter();

    // Set the current folder based on the pathname or default to the first folder
    const currentFolder = pathname.split('/').filter((url: string) => url !== '' && url !== 'home')[0] || folders[0];

    const handleCurrentOpenFolder = (folder: string): void => {
        // Update the URL when a folder is clicked
        router.push(`/home/${folder.replaceAll(' ', '-')}`);
    };

    const handleFilterButtonClick = (): void => {
        setFilter(!isFilterActive);
    };

    const handleGoingUpBack = () => {
        if (window.scrollY === 0) {
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // to save scroll position before the user leaves the page
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('scrollPosition', window.scrollY.toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // to restore scroll position when the page loads
    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            localStorage.removeItem('scrollPosition'); // Clear the saved position
        }

        // Enable scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto';
        }

        // Clean up (optional)
        return () => {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
        };
    }, []);

    return (
        <Fragment>
            <div className="folderContainer">
                <div className="folders-section">
                    <div className="scrollableFoldersContainer">
                        <div className="folders">
                            {folders.map((folder: string, index: number) => (
                                <Link
                                    href={`/home/${folder.replaceAll(' ', '_')}`}
                                    onClick={() => handleCurrentOpenFolder(folder)}
                                    className={currentFolder === folder.replaceAll(' ', '_') ? 'active' : ''}
                                    key={index}
                                >
                                    #{folder.charAt(0).toUpperCase() + folder.slice(1)}
                                </Link>
                            ))}

                            <AddFolderComponent existedFolders={folders} />
                        </div>
                    </div>
                    <div className="foldersFunctionalities">
                        <button className="goBackUpButton" onClick={handleGoingUpBack}>
                            <Image src={GoUpIcon} alt={'goBackToTop'} />
                        </button>
                        <div className={'filterIcon'} onClick={() => handleFilterButtonClick()}>
                            <Image src={filterIcon} alt="filter notes" width={25} />
                        </div>
                    </div>
                </div>
                {isFilterActive && <hr style={{ margin: '20px 0' }} />}
                {isFilterActive && <FilterComponent />}
            </div>

        </Fragment>
    );
}