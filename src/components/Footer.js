import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'

function Footer() {

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`

    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${themeClass}`}>
            <div>&copy;{`${currentYear}`} Kevin Rogers</div>
        </footer>
    )
}

export default Footer