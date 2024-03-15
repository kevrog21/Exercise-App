import logo from '../assets/dfc_logo.svg'
import SideNav from './SideNav'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    const [navMenuInteractedWith, setNavMenuInteractedWith] = useState(false)

    function showAndDisableNavMenu() {
        const container = document.querySelector('.nav-menu-container')
        const navMenu = document.querySelector('#nav-menu')
        const mainEl = document.querySelector('main')

        if (container) {
            if (isSideNavOpen) {
                container.classList.add('show')
                navMenu.classList.add('show')
                mainEl.classList.add('disable-pointer-events')
                document.documentElement.style.overflow = 'hidden'
                document.body.style.overflow = 'hidden'
                
            } else {
                container.classList.remove('show')
                navMenu.classList.remove('show')
                mainEl.classList.remove('disable-pointer-events')
                document.documentElement.style.overflow = ''
                document.body.style.overflow = ''
            }
        }
    }

    useEffect(() => {
        showAndDisableNavMenu()
    }, [isSideNavOpen])

    const handleMenuToggle = () => {
        setIsSideNavOpen((prevIsNavMenuOpen) => !prevIsNavMenuOpen)
        setNavMenuInteractedWith(true)
    }

    const handleNavItemClick = () => {
        setIsSideNavOpen(false)
    }

    return (
        <div>
            <header className="header">
                <div className='header-container'>
                    <Link to='/'><img className='header-logo' src={logo} onClick={handleNavItemClick}></img></Link>
                    <h2 className='app-title'>Daily Fit Challenge</h2>
                    <div className='hamburger-container' onClick={handleMenuToggle}>
                        <div className='hamburger-line-1'></div>
                        <div className='hamburger-line-2'></div>
                        <div className='hamburger-line-3'></div>
                    </div>
                </div>
            </header>
            <SideNav 
                isSideNavOpen={isSideNavOpen}
                setIsSideNavOpen={setIsSideNavOpen}
                handleNavItemClick={handleNavItemClick}
                showAndDisableNavMenu={showAndDisableNavMenu}
            />
        </div>
    )
}