import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import Image from "next/image";
import SearchIcon from "@/public/icons/search-2-line.svg";
import {usePathname} from "next/navigation";
import {useRouter} from 'nextjs-toploader/app';

import '../navbarStyling.css'

export default function SearchInputFieldComponent(): ReactElement {
    const [isSearchInputBarOpen, setIsSearchInputBarOpen] = useState<boolean>(false);
    const [userSearchQuery, setUserSearchQuery] = useState<string>(''); // Initial value is an empty string

    const pathname = usePathname()
    const router = useRouter()

    const handleUserSearching = (searchInputField: ChangeEvent<HTMLInputElement>): void => {
        setUserSearchQuery(searchInputField.target.value); // Always keep this as a string
    };

    useEffect(() => {
        if (pathname === '/browse') {
            setIsSearchInputBarOpen(true);
            router.push('/browse');
        } else {
            setIsSearchInputBarOpen(false);
        }
    }, [pathname]);


    return (
        <div className={isSearchInputBarOpen ? 'searchButton-active' : 'searchButton-inactive'}
             onClick={() => router.push('/browse')}>
            <Image src={SearchIcon} alt="expandProfileSettings"/>
            <input type="search"
                   placeholder="Search for highlights, people."
                   autoFocus
                   name={'searchBar'}
                   value={userSearchQuery}
                   onChange={handleUserSearching}/>
        </div>
    )
}