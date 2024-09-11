'use client';
import {ReactElement, useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import './browsingStyling.css';

import {existedFolders} from "@/app/compos/foldersComponent/FolderComponent";

export default function BrowsingComponent(): ReactElement {
    const pathname = usePathname().split('/').filter((url: string) => url !== '');
    const [isActiveLink, setActiveLink] = useState<string>(pathname[0]);

    const browsingPages: string[] = ['home', 'browse', 'stats'];

    const handleActiveLink = (navi: string): void => {
        setActiveLink(navi);
    };

    return (
        <div className="browsingContainer">
            {browsingPages.map((navi: string, index: number) => {
                return (
                    <Link
                        href={navi === 'home' ? `/home/${existedFolders.at(0)}` : `/${navi}`}
                        onClick={() => handleActiveLink(navi)}
                        className={isActiveLink === navi ? 'active' : ''}
                        key={index}
                    >
                        {navi.charAt(0).toUpperCase() + navi.slice(1)}
                    </Link>

                );
            })}
        </div>
    );
}
