import { useContext, useEffect, useState } from 'react'
import { useNavigateToLink } from './ToHomeScreen'
import { ThemeContext } from './ThemeProvider'

export default function Settings() {
    const navigate = useNavigateToLink()
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

    const handleBackButtonClick = () => {
        navigate('/')
    }

    return (
        <main>
            <div className='settings-container page-margin-top'>
                <div className='back-arrow-container' onClick={handleBackButtonClick}>
                    <div className='back-arrow'></div>
                    <div className='back-arrow-tail'></div>
                </div>
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