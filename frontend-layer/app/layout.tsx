'use client'

import './globals.css'
import {usePathname} from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/app/compos/navbar/Navbar";
import Footer from "@/app/compos/footer/Footer";
import SearchInputFieldProvider from '@/utils/providers/searchInputFieldProvider'
import NavbarPhoneScreenSize from "@/app/compos/navbar/navbar-screen-sizes/NavbarPhoneScreenSize";
import {ReactNode, useEffect, useState} from "react";
import NotificationUserProfileNavbar from "@/app/compos/navbar/navbar-screen-sizes/NotificationUserProfileNavbar";
import {useMediaQuery} from "react-responsive";

// routes
const routes = [
    '/home',
    '/browse',
    '/stats',
    '/settings',
    '/profile',
    '/createnotes'
]

export default function HomeLayout({children}: {children: ReactNode}) {

    const windowWidth = useMediaQuery({query: '(width <= 700px)'});

    const pathname = usePathname();

    const isHighlightsReviewPage = pathname.startsWith('/highlightsreview') || pathname.startsWith('/registration')
    const isInLandingPage = routes.some((route) => pathname.startsWith(route));


    return <html lang={"en"}>
    <body>
    <SearchInputFieldProvider>
        {!isHighlightsReviewPage && (
            <>
                <NextTopLoader color={"#000000"} height={2} speed={600} showSpinner={false}/>
                {windowWidth && <NotificationUserProfileNavbar/>}
                {isInLandingPage && !windowWidth && <Navbar/>}
                {windowWidth && <NavbarPhoneScreenSize/>}

            </>
        )}
        {children}
    </SearchInputFieldProvider>

    {!isHighlightsReviewPage && <Footer/>}
    </body>
    </html>
}