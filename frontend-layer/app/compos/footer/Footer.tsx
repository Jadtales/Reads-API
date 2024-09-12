import {ReactElement} from "react";
import Image from "next/image";

export default function Footer(): ReactElement{
    return (
        <footer>
            <div className="reanotesFooter">
                <div className="readnotes-logo-name">
                    <Image src="@" alt="readnotes"/>
                    <h1>Reanotes.</h1>
                </div>

                <div className="reanotesGeneralInfos-subscribed">

                </div>
            </div>
        </footer>
    )
}