import logo from '../assets/dfc_logo.svg'
import SideNav from './SideNav'

export default function Header() {
    return (
        <div>
            <header className="header">
                <div className='header-container'>
                    <img className='header-logo' src={logo}></img>
                    <h2 className='app-title'>Daily Fit Challenge</h2>
                    <div className='hamburger-container'>
                        <div className='hamburger-line-1'></div>
                        <div className='hamburger-line-2'></div>
                        <div className='hamburger-line-3'></div>
                    </div>
                </div>
            </header>
            <SideNav />
        </div>
    )
}