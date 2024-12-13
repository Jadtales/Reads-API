'use client'

import './globals.css'
import {usePathname} from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/app/compos/navbar/Navbar";
import Footer from "@/app/compos/footer/Footer";
import SearchInputFieldProvider from '@/utils/providers/searchInputFieldProvider'

export default function HomeLayout({children}) {

    const pathname = usePathname();
    const isHighlightsReviewPage = pathname.startsWith('/highlightsreview') || pathname.startsWith('/registration')

    return <html lang={"en"}>
    <body>
    <SearchInputFieldProvider>
        {!isHighlightsReviewPage && (
            <>
                <NextTopLoader color={"#000000"} height={2} speed={600} showSpinner={false}/>
                <Navbar/>
            </>
        )}
        {children}
    </SearchInputFieldProvider>
    {!isHighlightsReviewPage && <Footer />}
    <div id="modalsSection"></div>
    </body>
    </html>
}