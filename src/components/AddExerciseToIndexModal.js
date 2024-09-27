import { useContext, useState } from 'react'

export default function AddExerciseToIndexModal(props) {
    
    const { closeModal } = props

    const [formData, setFormData] = useState({
        exerciseTitle: '',
        pword: '',
        honeyp: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }
      
    const handleSubmit = (e) => {
        console.log('add exerise formData here: ', formData)
    }


    return (
        <div className='exercise-modal-container'>
            <div className="x-button-container" onClick={closeModal}>
                <div className="x-1"  onClick={closeModal}></div>
                <div className="x-2"  onClick={closeModal}></div>
            </div>
            <div className='modal-content-container'>
                <form onSubmit={handleSubmit}>
                    <div className=''>
                        add a new exercise
                    </div>

                    <label htmlFor='pword' className='password-label'>Title</label>
                    <input type='text' name='exerciseTitle' value={formData.exerciseTitle} onChange={handleInputChange}></input>
                
                    <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleInputChange} tabIndex='-1' autoComplete="off"></input>
                    <label htmlFor='pword' className='password-label'>password</label>
                    <input type='password' name='pword' value={formData.pword} onChange={handleInputChange}></input>
                    <div id='incorrect-password-message' className='hide'>incorrect password</div>
                    <button type="submit" className="submit-btn" id="submit" >Add Exercise</button>
                </form>

            </div>
        </div>
    )
}

