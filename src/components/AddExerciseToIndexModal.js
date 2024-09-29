import { useContext, useState } from 'react'
import { ThemeContext } from './ThemeProvider'

export default function AddExerciseToIndexModal(props) {
    
    const { closeModal, setActiveFormState } = props

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`
    
    const [formData, setFormData] = useState({
        exerciseTitle: '',
        exerciseCategory: '',
        workoutType: '',
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
        e.preventDefault()
        console.log('add exerise formData here: ', formData)
    }

    const handleModalInteraction = (e) => {
        setActiveFormState(true)
    }

    return (
        <div className={`exercise-modal-container ${themeClass}`} id='exercise-modal-id'>
            <div className='adding-exercise'>adding exercise...</div>
            <div className="x-button-container" onClick={closeModal}>
                <div className="x-1"  onClick={closeModal}></div>
                <div className="x-2"  onClick={closeModal}></div>
            </div>
            <div className='modal-content-container' onClick={handleModalInteraction}>
                <form onSubmit={handleSubmit} className='add-exercise-form'>
                    <div className='add-exercise-input-container'>
                        <input type='text' className='exercise-title-input' name='exerciseTitle' value={formData.exerciseTitle} onChange={handleInputChange}
                        placeholder='Exercise Title'></input>
                    </div>
                    <div className='add-exercise-input-container exercise-input-with-border'>
                        <label htmlFor='exerciseCategory' className='exercise-input-label' >category:</label>
                        <select className='exercise-dropdown' name='exerciseCategory' onChange={handleInputChange} value={formData.exerciseCategory}>
                            <option value=''>please select...</option>
                            <option value='back'>back</option>
                            <option value='chest'>chest</option>
                            <option value='legs'>legs</option>
                            <option value='abs'>abs</option>
                            <option value='shoulders'>shoulders</option>
                            <option value='triceps'>triceps</option>
                            <option value='biceps'>biceps</option>
                            <option value='cardio'>cardio</option> 
                        </select>
                    </div>
                    <div className='add-exercise-input-container exercise-input-with-border'>
                        <label htmlFor='workoutType' className='exercise-input-label' >workout type:</label>
                        <select className='exercise-dropdown' name='workoutType' onChange={handleInputChange} value={formData.workoutType}>
                            <option value='weights and reps'>weights and reps</option>
                            <option value='yoga'>yoga</option>
                            <option value='stretch'>stretch</option>
                        </select>
                    </div>
                    <div className='add-exercise-input-container exercise-input-with-border'>
                        <label htmlFor='pword' className='exercise-input-label'>password:</label>
                        <input type='password' className='exercise-password' name='pword' value={formData.pword} onChange={handleInputChange}></input>
                    </div>
                    
                    
                
                    <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleInputChange} tabIndex='-1' autoComplete="off"></input>
                    {/* <label htmlFor='pword' className='password-label'>password</label>
                    <input type='password' name='pword' value={formData.pword} onChange={handleInputChange}></input>
                    <div id='incorrect-password-message' className='hide'>incorrect password</div> */}
                    <div className='save-exercise-symbol-container'>
                        <button type="submit" className='save-exercise-symbol'>+</button>
                        <button type="submit" className="exercise-index-submit-btn" id="submit" >Save Exercise</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

