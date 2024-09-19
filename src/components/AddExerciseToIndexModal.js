import { useContext } from 'react'

export default function AddExerciseToIndexModal(props) {
    
    const { setAddExerciseMode } = props

    const closeModal = () => {
        console.log('closing modal')
        setAddExerciseMode(false)
    }

    return (
        <div className='add-exercise-container'>
            <div className='exercise-modal-container'>
                <div className="x-button-container" onClick={closeModal}>
                    <div className="x-1"></div>
                    <div className="x-2"></div>

                </div>
                modal here
            </div>
        </div>
    )
}

