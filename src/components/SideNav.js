import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from './ThemeProvider'

export default function SideNav(props) {

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`

    function closeNavMenu() {
        props.setIsSideNavOpen(false)
    }
    
    useEffect(() => {
        props.showAndDisableNavMenu()
    }, [props.isSideNavOpen])

    return (
        <div className='nav-menu-container' onClick={closeNavMenu} style={props.isSideNavOpen ? {} : {pointerEvents: 'none'}}>
            <div id='nav-menu' className={`nav-menu ${themeClass}`}>
                <Link to='/user-profile' className='profile-icon-text-container' onClick={props.clearNoScrollFromBody}> 
                    <div className='profile-icon-container'>
                        <div className='profile-icon-head'></div>
                        <div className='profile-icon-body'></div>
                    </div>
                    <div className='profile-icon-text'>Kevin</div>
                </Link>
                <div className='profile-name'></div>
                <Link to=''  className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Home</Link>
                <Link to='/current-daily-challenge' className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Current Challenge</Link>
                <Link to='/user-settings' className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Settings</Link>
                <Link to='/daily-routine' className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Daily Routine</Link>
                <Link to='/user-stats' className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Stats</Link>
                <Link to='/goals' className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Goals</Link>
                <Link to='/user-rules' className="nav-item nav-link" onClick={props.clearNoScrollFromBody}>Rules</Link>
                <Link to='/exercise-index' className="nav-item nav-link">Exercise Index</Link>
            </div>
        </div>
    )
}