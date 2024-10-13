import './highlightsPageLayoutStyling.css'
import Image from "next/image";
import BrainIcon from "@/public/icons/brainIcon.svg";
import './highlightsPageLayoutStyling.css'

export default function HighlightsReviewPageLayout({
                                                       children,
                                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="bookReviewerContainer">
            <div className="tableOfContent_otherSettings">
                <div className="bookTableOfContent">
                    <h1>Table of Contents</h1>
                </div>

                <div className="cardTitles">
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                    <span>dsdsds</span>
                </div>

                <div className="otherSettings">
                    <span className="modeSwitcher">
                        <Image src={BrainIcon} alt="memorizationMode" width={18}/>
                        Switch to Memorization Mode
                    </span>
                    <span className="AdvancedUsage">Advanced usage</span>
                </div>
            </div>
            {children}
        </div>
    );
}
