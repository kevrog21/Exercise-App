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
                <div className="nav-item">Settings</div>
                <Link to='/daily-routine' className="nav-item nav-link">Daily Routine</Link>
                <div className="nav-item">Stats</div>
            </div>
        </div>
    )
}