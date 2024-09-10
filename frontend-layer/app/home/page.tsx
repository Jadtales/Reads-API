import {ReactElement} from "react";
import FolderComponent from "@/app/compos/foldersComponent/FolderComponent";

export default function Home(): ReactElement {
    return (
        <div style={{width: "100%"}}>
            <FolderComponent/>
        </div>
    )
}