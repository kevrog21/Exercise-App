import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function SideNav(props) {

    function closeNavMenu() {
        props.setIsSideNavOpen(false)
    }
    
    useEffect(() => {
        props.showAndDisableNavMenu()
    }, [props.isSideNavOpen])

    return (
        <div className='nav-menu-container' onClick={closeNavMenu} style={props.isSideNavOpen ? {} : {pointerEvents: 'none'}}>
            <div id='nav-menu' className=''>
                <Link to=''  className="nav-item nav-link">Home</Link>
                <Link to='/user-settings' className="nav-item nav-link">Settings</Link>
                <Link to='/daily-routine' className="nav-item nav-link">Daily Routine</Link>
                <Link to='/user-stats' className="nav-item nav-link">Stats</Link>
                <Link to='/goals' className="nav-item nav-link">Goals</Link>
                <Link to='/user-rules' className="nav-item nav-link">Rules</Link>
                <Link to='/exercise-index' className="nav-item nav-link">Exercise Index</Link>
            </div>
        </div>
    )
}