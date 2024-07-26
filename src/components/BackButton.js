import { useContext } from 'react'
import { useNavigateToLink } from './ToHomeScreen'
import { ThemeContext } from './ThemeProvider'

export default function BackButton() {

    const navigate = useNavigateToLink()

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`

    const handleBackButtonClick = () => {
        navigate('/')
    }

    return (
        <div className='back-arrow-container' onClick={handleBackButtonClick}>
            <div className={`back-arrow ${themeClass}`}></div>
            <div className={`back-arrow-tail ${themeClass}`}></div>
        </div>
    )
}