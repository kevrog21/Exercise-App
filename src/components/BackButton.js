import { useNavigateToLink } from './ToHomeScreen'

export default function BackButton() {

    const navigate = useNavigateToLink()

    const handleBackButtonClick = () => {
        navigate('/')
    }

    return (
        <div className='back-arrow-container' onClick={handleBackButtonClick}>
            <div className='back-arrow'></div>
            <div className='back-arrow-tail'></div>
        </div>
    )
}