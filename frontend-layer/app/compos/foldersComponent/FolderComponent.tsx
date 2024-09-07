'use client';
import { ReactElement, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import './folderStyling.css';
import AddNoteComponentButton from '@/app/compos/AddNoteButtonCompo/AddNoteButtonComponent';

export const userFolder: string[] = ['poetry', 'fiction'];
export default function FolderComponent(): ReactElement {
    const pathname: string[] = usePathname().split('/').filter((url: string) => url !== '' && url !== 'home');
    const router = useRouter();


    // Set the first folder as the default if no folder is present in the path
    const defaultFolder = userFolder[0];

    const [currentFolder, setCurrentFolder] = useState<string>(pathname[0] || defaultFolder);

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
                                href={`/home/${folder}`}
                                onClick={() => handleCurrentOpenFolder(folder)}
                                className={currentFolder === folder ? 'active' : ''}
                                key={index}
                            >
                                {folder.charAt(0).toUpperCase() + folder.slice(1)}
                            </Link>
                        );
                    })}
                    <li>
                        <span>+</span>
                    </li>
                </ul>
            </div>


            <AddNoteComponentButton />
        </>
    );
}
