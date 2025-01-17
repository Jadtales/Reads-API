'use client'

import Navbar from "@/app/compos/navbar/Navbar";
import Footer from "@/app/compos/footer/Footer";
import NotificationUserProfileNavbar from "@/app/compos/navbar/navbar-screen-sizes/NotificationUserProfileNavbar";
import SearchInputFieldProvider from '@/utils/providers/searchInputFieldProvider'
import NavbarPhoneScreenSize from "@/app/compos/navbar/navbar-screen-sizes/NavbarPhoneScreenSize";
import ThemeProvider from '../utils/providers/ThemeProvider'

import './globals.css'
import {ReactNode, useEffect, useState} from "react";
import NextTopLoader from "nextjs-toploader";
import {usePathname, useRouter} from "next/navigation";
import {useMediaQuery} from "react-responsive";
import {router} from "next/client";

// routes
const routes = [
    '/home',
    '/browse',
    '/stats',
    '/settings',
    '/profile',
    '/createnotes'
]

export default function HomeLayout({children}: { children: ReactNode }) {

    // const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);

    const windowWidth = useMediaQuery({query: '(width <= 700px)'});

    const pathname = usePathname();
    // const router = useRouter();

    const isHighlightsReviewPage = pathname.startsWith('/highlightsreview') || pathname.startsWith('/registration')
    const isInLandingPage = routes.some((route) => pathname.startsWith(route));

    // // check user token
    // useEffect(() => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     if (!accessToken && !pathname.startsWith('/registration')){
    //         router.push('/');
    //         return;
    //     }
    //
    //     if(!accessToken && !pathname.startsWith('/')){
    //         setIsUserLoggedIn(false);
    //         router.push('/registration');
    //     }else{
    //         setIsUserLoggedIn(true)
    //     }
    // }, [router]);

    return <html lang={"en"}>
    <body>
    <ThemeProvider>
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
    </ThemeProvider>

    </body>
    </html>
}