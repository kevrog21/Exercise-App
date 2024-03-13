import { useEffect } from "react"

export default function SideNav(props) {

    function closeNavMenu() {
        props.setIsSideNavOpen(false)
    }
    
    useEffect(() => {
        props.showAndDisableNavMenu()
    }, [props.isNavMenuOpen])

    return (
        <div className='nav-menu-container' onClick={closeNavMenu} style={props.isNavMenuOpen ? {} : {pointerEvents: 'none'}}>
             <div id='nav-menu' className=''>

             </div>
        </div>
    )
}