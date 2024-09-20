'use client'

import {ReactElement, useState} from "react";
import './settingsPageStyling.css'

export default function SettingsPage(): ReactElement {
    const [chosenSettings, setChosenSettings] = useState<string>('general')
    const [selectedSettings, setSelectedSettings] = useState<string[]>([])

    const handleChosenSettings = (setting: string): void => {
        setChosenSettings(setting)

    }

    const handleIsFilterOptionActive = (spanText: string): void => {
        if (selectedSettings.includes(spanText)) {
            // If span is already active, remove it from the active list
            setSelectedSettings(selectedSettings.filter(active => active !== spanText));
        } else {
            // If span is not active, add it to the active list
            setSelectedSettings([...selectedSettings, spanText]);
        }
    };


    return (
        <div className="settingsPageContainer">
            <div className="settingsTarget">
                <h3>Account settings</h3>
                <ul>
                    <li className={chosenSettings === 'general' && "settingsTargetLi-active"}
                        onClick={() => handleChosenSettings('general')}>General
                    </li>
                    <li className={chosenSettings === 'myProfile' && "settingsTargetLi-active"}
                        onClick={() => handleChosenSettings('myProfile')}>My Profile</li>
                </ul>
            </div>

            {/*settings adjustments are based on the settings target*/}
            {chosenSettings === "general" ?
                (<div className="settingsAdjustments-generalSettings">
                    <div className="notificationsAdjustments">
                        <h3>Notifications</h3>
                        <ul>
                            {['To new events.', 'To review my highlights.'].map((option: string) => (
                                <li key={option}
                                    className={selectedSettings.includes(option) ? 'li-active' : ''}
                                    onClick={() => handleIsFilterOptionActive(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="appearanceAdjustments">
                        <h3>Appearance</h3>
                        <select name="theme" id="themeAppearance">
                            <option value="system">System</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>

                    <div className="languageAdjustment">
                        <h3>Language</h3>
                        <select name="language" id="languagesSelection">
                            <option value="English">English</option>
                            <option value="Polish">Polish</option>
                        </select>
                    </div>
                </div>) : (<div className="userProfileAdjustments">
                    <div className="userCredentials">
                        <h3>User credentials</h3>
                        <h2 className="userUsername">
                            #jadtales
                        </h2>

                        <form action="toChangeCredentials">
                            <input type="email"
                                   defaultValue={"amjadmassaoudw@gmail.com"}
                                   placeholder="your email."/>
                            <input type="password" placeholder="your password"/>

                            <div className="formButtons">
                                <button type="submit">Save</button>
                                <button type="submit">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>)}


        </div>
    )
}