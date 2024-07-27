import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeProvider'
import BackButton from './BackButton'

export default function Settings() {
    const [settingsFormData, setSettingsFormData] = useState({})

    const { theme, setTheme } = useContext(ThemeContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setSettingsFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    useEffect(() => {
        console.log('theme', theme)
        const themeOnLoad = localStorage.getItem('theme')
        if (themeOnLoad !== 'light-mode') {
            setSettingsFormData((prevFormData) => ({
                ...prevFormData,
                theme: themeOnLoad
            }))
        }
    }, [])

    useEffect(() => {
        if (settingsFormData.theme) {
            localStorage.setItem('theme', settingsFormData.theme)
            setTheme(settingsFormData.theme)
        }
    }, [settingsFormData.theme])

    return (
        <main>
            <div className='settings-container page-margin-top'>
                <BackButton />
                <div className='settings-header'>Settings</div>
                <form>
                    <label htmlFor="theme">Theme</label>
                    <select 
                        className='theme-input'
                        name="theme"
                        value={settingsFormData.theme}
                        onChange={handleInputChange}
                    >
                        <option value="light-mode">light mode</option>
                        <option value="dark-mode">dark mode</option> 
                        <option value="beast-mode">beast mode</option>
                    </select>
                    {/* <div>
                        <button type='submit' className='settings-submit-btn'>update settings</button>
                    </div> */}
                </form>
            </div>
        </main>
    )
}