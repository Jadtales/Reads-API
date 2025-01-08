'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import './navbarPhoneScreenSizeStyling.css';

import HomeIcon from '@/public/icons/homeIcon.svg'
import StatsIcon from '@/public/icons/statsIcon.svg'
import SearchInputFieldComponent from "@/app/compos/navbar/navbar_microComponents/SearchInputFieldComponent";
import {useRouter} from "nextjs-toploader/app";

export default function NavbarPhoneScreenSize() {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const router = useRouter();

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleWidthResizing = (): void => {
            setWindowWidth(window.scrollX)
        }

        document.addEventListener('scroll', handleWidthResizing);

        return (): void => {
            document.removeEventListener('scroll', handleWidthResizing);
        }

    }, []);


    if(windowWidth > 700) return;

    return (
        <nav className={'navbarForPhoneSize'}>
            <button onClick={() => router.push('/home/unspecified')}><Image src={HomeIcon} alt={'homePage'}/></button>
            <SearchInputFieldComponent/>
            <button onClick={() => router.push('stats')}><Image src={StatsIcon} alt={'statsPage'}/></button>
            <button className={'addNoteButton-navbarPhoneScreenSize'}>+</button>
        </nav>
    );
}