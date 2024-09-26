import { useContext } from 'react'

export default function AddExerciseToIndexModal(props) {
    
    const { closeModal } = props

    return (
        <div className='exercise-modal-container'>
            <div className="x-button-container" onClick={closeModal}>
                <div className="x-1"  onClick={closeModal}></div>
                <div className="x-2"  onClick={closeModal}></div>

            </div>
            modal here
        </div>
    )
}

