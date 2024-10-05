import {ReactElement, useState} from "react";
import './notificationsComponentStyling.css'

export default function ReportBugsComponent(): ReactElement {
    const [activePriority, setActivePriority] = useState<string>('');

    const chosenPriorityOption = (): void => {

    }

    return (
        <div className="reportBugsContainer">
            <h1>Issue priority</h1>
            <div className="issuePriority">
                <button className="basic">Basic</button>
                <button className="important">Important</button>
                <button className="urgent">Urgent</button>
            </div>

            <h1>Issue description</h1>
            <form action="/toReportedIssuesStack" id="formElement">
                <textarea name="textarea" id="issueDescription" cols="30"
                          rows="30">Write your issue description</textarea>


                <button type="submit">Submit</button>
            </form>
        </div>
    )
}