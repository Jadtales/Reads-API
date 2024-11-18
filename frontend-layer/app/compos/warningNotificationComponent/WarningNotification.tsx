'use client'

import {ReactElement, useEffect, useState} from "react";
import './warningNotificationStyling.css'

export default function useWarningNotification(): {
    toggleElementActivation: (value: boolean) => void
    warningFunction: (errorContext: string) => ReactElement | null
} {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(false);
    let timer: number;


    const toggleElementActivation = (value: boolean = false) => {

        if (value) {
            setIsExiting(value)

            timer = window.setTimeout(() => {
                setIsActive(true);

                window.setTimeout(() => {
                    window.clearTimeout(timer)
                    setIsActive(false);
                    setIsExiting(false)
                    return
                }, 5000)

            }, 0)
        }
    }

    const warningFunction = (errorContext: string): ReactElement | null => {
        if (isExiting) {
            return (
                <div
                    className={
                        isActive ? 'warningNotification-active' : 'warningNotification-inactive'
                    }>
                    Error: {errorContext}
                </div>
            );
        }else {
            window.clearTimeout(timer)
            return null; // Return null when not active
        }
    };

    useEffect(() => {
        return () => {
            if (timer) {
                window.clearTimeout(timer); // Clear timeout if the component unmounts
            }
        };
    }, []);


    return {
        toggleElementActivation,
        warningFunction
    }
}