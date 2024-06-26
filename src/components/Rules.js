import { useNavigateToLink } from './ToHomeScreen'

export default function Rules() {

    const navigate = useNavigateToLink()

    const handleBackButtonClick = () => {
        navigate('/')
    }

    return (
        <main className='page-margin-top'>
            <div>
                <div className='back-arrow-container' onClick={handleBackButtonClick}>
                        <div className='back-arrow'></div>
                        <div className='back-arrow-tail'></div>
                    </div>
                <div className='rules-container'>
                    <div className='rules-header'>Rules</div>
                    <p>- A daily challenge must be completed within the calendar day that it is started in order to advance to the next challenge.</p>
                    <p>- A challenge can be started and revisited as many times throughout the day, as long as it is completed before midnight.</p>
                    <p>- After completion of a challenge, the user cannot start the next challenge until the following calendar day.</p>
                    <p>- The increase in repetitions/duration between each challenge is determined by the user when setting their daily routine.</p>
                </div>
            </div>
        </main>
    )
}