'use client'

import {Fragment, ReactElement, useState} from "react";
import './settingsPageStyling.css'
import GoBackToComponent from "@/app/compos/goBackTo-component/GoBackTo-Component";
import GeneralSettingPageComponents from "@/app/compos/settingPageComponents/GeneralSettings";

export default function SettingsPage(): ReactElement {
    const [chosenSettings, setChosenSettings] = useState<string>('general')

    const handleChosenSettings = (setting: string): void => {
        setChosenSettings(setting)
    }


    return (

        <Fragment>
            <GoBackToComponent/>
            <div className="settingsPageContainer">
                <div className="settingsTarget">
                    <h3>Account settings</h3>
                    <ul>
                        <li className={chosenSettings === 'general' && "settingsTargetLi-active"}
                            onClick={() => handleChosenSettings('general')}>General
                        </li>
                        <li className={chosenSettings === 'myProfile' && "settingsTargetLi-active"}
                            onClick={() => handleChosenSettings('myProfile')}>My Profile
                        </li>
                    </ul>
                </div>

                {/*settings adjustments are based on the settings target*/}
                {chosenSettings === "general" ?
                    <GeneralSettingPageComponents/>
                    : (<div className="userProfileAdjustments">
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
        </Fragment>

    )
}