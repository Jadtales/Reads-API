'use client';

import {useState, useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import './browsingStyling.css';

import HomeIcon from '@/public/icons/homeIcon.svg';
import StatsIcon from '@/public/icons/statsIcon.svg';

import {existedFolders} from '@/app/home/[folder]/page';
import Image from 'next/image';

export default function BrowsingComponent(): React.ReactElement | null {
    const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);
    const pathname = usePathname();

    // Dynamically adjust the pages to show based on the width
    const browsingPages: string[] = pageWidth >= 1420 ? ['home', 'browse', 'stats'] : ['home', 'stats'];

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                setPageWidth(window.innerWidth);
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="browsingContainer">
            {browsingPages.map((navi: string, index: number) => {
                const isActive = pathname.split('/').filter(Boolean)[0] === navi;

                return (
                    <Link
                        href={navi === 'home' ? `/home/${existedFolders[0]}` : `/${navi}`}
                        className={isActive ? 'active' : ''}
                        key={index}
                    >
                        {pageWidth >= 1420 ? (
                            // Full text label when the width is greater than 1420px
                            navi.charAt(0).toUpperCase() + navi.slice(1)
                        ) : (
                            // Icons when the width is less than or equal to 1420px
                            <Image
                                style={{ marginTop: '5px' }}
                                width={22}
                                src={navi === 'home' ? HomeIcon : StatsIcon}
                                alt={`goTo${navi.charAt(0).toUpperCase() + navi.slice(1)}Page`}
                            />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}