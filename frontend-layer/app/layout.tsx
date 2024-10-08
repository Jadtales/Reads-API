'use client'

import './globals.css'
import {usePathname} from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/app/compos/navbar/Navbar";
import BrowsingComponent from "@/app/compos/browsing/BrowsingComponent";
import Footer from "@/app/compos/footer/Footer";

export default function HomeLayout({children}) {

    const pathname = usePathname();
    const isHighlightsReviewPage = pathname.startsWith('/highlightsreview')

    return <html lang={"en"}>
    <body>
    {!isHighlightsReviewPage && (
        <>
            <NextTopLoader color={"#000000"} height={2} speed={600} showSpinner={false}/>
            <Navbar/>
            <div className="navigationButtons">
                <BrowsingComponent/>
            </div>
        </>
    )}
    {children}
    {!isHighlightsReviewPage && <Footer />}
    </body>
    </html>
}