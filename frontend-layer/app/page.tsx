import {Fragment} from "react";
import LandingPageNavbar from "@/app/compos/landing-page/Navbar";
import './pageStyling.css'
import LandingPageComparisonTable from "@/app/compos/landing-page/ComparisonTable";
import Image from "next/image";
import ReanotesHomePageImg from '@/public/examples/reanotesHomePage.png'
import PresentationalComponents from "@/app/compos/landing-page/PresentationalComponents";
import {TextEffect} from "@/animationStyling/TextEffect";

export default function LandingPage() {
    return <Fragment>
        {/*<LandingPageNavbar/>*/}

        <div className="offers">
            <h1><TextEffect>Meet Reanotes</TextEffect></h1>
            <h4>A better way to memorize your book highlights with the power of flashcards.
                <br/>
                <span>The alternative for Readwise!</span>
            </h4>

            <div className="reanotesHomePageImg">
                <Image src={ReanotesHomePageImg} alt={'reanotes_homePage'}/>
            </div>

            <div className="reanotes_readwise_comparison_section">
                <h1>Comparing Reanotes with Readwise</h1>

                <LandingPageComparisonTable/>
            </div>
            <PresentationalComponents/>

        </div>
    </Fragment>
}