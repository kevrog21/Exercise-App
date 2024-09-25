import { useContext } from 'react'

export default function AddExerciseToIndexModal(props) {
    
    const { setAddExerciseMode } = props

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setAddExerciseMode(false)
        }
    }

    return (
        <div className='add-exercise-container' onClick={closeModal}>
            <div className='exercise-modal-container'>
                <div className="x-button-container" onClick={closeModal}>
                    <div className="x-1"  onClick={closeModal}></div>
                    <div className="x-2"  onClick={closeModal}></div>

                </div>
                modal here
            </div>
        </div>
    )
}

