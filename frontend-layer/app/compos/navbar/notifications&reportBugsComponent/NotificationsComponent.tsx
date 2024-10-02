import {ReactElement} from "react";
import './notificationsComponentStyling.css'

interface INotification {
    username: string;
    purpose: "Updated" | "Posted";
    targetChange: string;
}

export default function NotificationsComponent({username, purpose, targetChange}: INotification): ReactElement {
    return (
        <div className="notificationsComponent">
            <h1 id="NotifierUsername">@{username}</h1>

            <div className="whatChanged">
                <span className="actionOfChange">{purpose} {targetChange}</span>  Note.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ducimus ea eos, et eveniet fuga hic id
                in ipsa laborum magnam mollitia non numquam perferendis possimus praesentium reprehenderit sed vero.
            </div>
        </div>
    )
}