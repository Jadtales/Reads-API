import {ChangeEvent, ReactElement, useEffect, useState} from "react";

export default function GeneralSettingPageComponents(): ReactElement {
    const [selectedSettings, setSelectedSettings] = useState<string[]>([])
    const [themeMode, setThemeMode] = useState<string>('system')

    // Set the use theme preference
    const handleUserThemePrefrence = (event: ChangeEvent<HTMLSelectElement>): void => {
        setThemeMode(event.target.value)
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

    // Apply theme based on user's choice or system preference
    useEffect(() => {
        const applyTheme = (mode: string) => {
            if (mode === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else if (mode === 'light') {
                document.documentElement.removeAttribute('data-theme'); // Remove any theme attribute for light mode
            }
        };

        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        if (themeMode === 'system') {
            // Apply system preference
            applyTheme(systemDarkMode.matches ? 'dark' : 'light');

            // Listen for changes in system theme
            const systemThemeListener = (e: MediaQueryListEvent) => {
                applyTheme(e.matches ? 'dark' : 'light');
            };
            systemDarkMode.addEventListener('change', systemThemeListener);

            // Clean up event listener on unmount
            return () => {
                systemDarkMode.removeEventListener('change', systemThemeListener);
            };
        } else {
            // Apply user-defined theme ('light' or 'dark')
            applyTheme(themeMode);
        }
    }, [themeMode]);

    return (
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
                <select name="theme"
                        id="themeAppearance"
                        value={themeMode}
                        onChange={handleUserThemePrefrence}>
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div className="languageAdjustment">
                <h3>Language</h3>
                <select name="language"
                        id="languagesSelection">
                    <option value="English">English</option>
                    <option value="Polish">Polish</option>
                </select>
            </div>
        </div>)
    )
}