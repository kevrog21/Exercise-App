import { useContext, useState } from 'react'
import { ThemeContext } from './ThemeProvider'
import { ReactComponent as AddIcon } from '../assets/add_button.svg'

export default function AddExerciseToIndexModal(props) {
    
    const { retrieveExerciseData, setAddExerciseMode, closeModal, setActiveFormState, setShowSuccessMessage } = props

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`
    
    const [formData, setFormData] = useState({
        exerciseTitle: '',
        exerciseCategory: '',
        workoutType: '',
        exerciseDescription: '',
        pword: '',
        honeyp: ''
    })

    const [formErrors, setFormErrors] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleModalInteraction = (e) => {
        setActiveFormState(true)
    }

    const validateFormData = () => {
        const newErrors = []

        if (!formData.exerciseTitle) {
            newErrors.push(`Please add a title for the exercise`)
        }
        if (!formData.exerciseCategory) {
            newErrors.push(`Please select a category`)
        }
        if (!formData.workoutType) {
            newErrors.push(`Please select a workout type`)
        }

        setFormErrors(newErrors)
        return newErrors.length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('add exerise formData here: ', formData)

        if (formData.honeyp === '') {
            if (validateFormData()) {
                try {
                    const response = await fetch('https://dailyfitchallenge.com/workout-histories/check-passwords', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            pword: formData.pword,
                            honeyp: formData.honeyp 
                        })
                    })
        
                    if (!response.ok) {
                        throw new Error('Failed to check password.')
                    }
        
                    const { valid } = await response.json()

                    if (valid) {

                        console.log('about to send post request')
    
                        const postResponse = await fetch(`https://dailyfitchallenge.com/exercise-index-data/add`, {
                            method: "POST",
                            body: JSON.stringify(formData),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
    
                        if (!postResponse.ok) {
                            throw new Error('Failed to post new exercise to exercise index')
                        }

                        const postData = await postResponse.json()
                        console.log('post data', postData)
                        retrieveExerciseData()
                        setFormData({
                            exerciseTitle: '',
                            exerciseCategory: '',
                            workoutType: '',
                            exerciseDescription: '',
                            pword: '',
                            honeyp: ''
                        })
                        setShowSuccessMessage(true)
                        setAddExerciseMode(false)
                    } else {
                        setFormErrors((prevErrors) => {
                            return [...prevErrors, 'Incorrect Password']
                        })
                    }
 
                } catch (error) {
                    console.error('error: ', error.message)
                } 
            }
        }
    }

    return (
        <div className={`exercise-modal-container ${themeClass}`} id='exercise-modal-id'>
            <div className='adding-exercise'>adding exercise...</div>
            <div className="x-button-container" onClick={closeModal}>
                <div className="x-1"  onClick={closeModal}></div>
                <div className="x-2"  onClick={closeModal}></div>
            </div>
            <div className='exercise-index-error'>{formErrors[0]}</div>
            <div className='modal-content-container' onClick={handleModalInteraction}>
                <form onSubmit={handleSubmit} className='add-exercise-form'>
                    <div className='add-exercise-input-container'>
                        <input type='text' className='exercise-title-input' name='exerciseTitle' value={formData.exerciseTitle} onChange={handleInputChange}
                        placeholder='Exercise Title'></input>
                    </div>
                    <div className='add-exercise-input-container exercise-input-with-border'>
                        <label htmlFor='exerciseCategory' className='exercise-input-label' >category:</label>
                        <select className={`exercise-dropdown ${formData.exerciseCategory ? 'has-selection' : ''}`} name='exerciseCategory' onChange={handleInputChange} value={formData.exerciseCategory}>
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
                        <select className={`exercise-dropdown ${formData.workoutType ? 'has-selection' : ''}`} name='workoutType' onChange={handleInputChange} value={formData.workoutType}>
                            <option value=''>please select...</option>  
                            <option value='weights and reps'>weights & reps</option>
                            <option value='yoga'>yoga</option>
                            <option value='stretch'>stretch</option>
                        </select>
                    </div>
                    <div className='add-exercise-input-container exercise-input-with-border'>
                        <label htmlFor='exerciseDescription' className='exercise-input-label' >description:</label>
                        <textarea rows="3" type="text" className='exercise-description-input' name='exerciseDescription' value={formData.exerciseDescription} onChange={handleInputChange}
                        placeholder='(optional)'></textarea>
                    </div>
                    <div className='add-exercise-input-container exercise-input-with-border'>
                        <label htmlFor='pword' className='exercise-input-label'>password:</label>
                        <input type='password' className='exercise-password' name='pword' value={formData.pword} onChange={handleInputChange}></input>
                    </div>
                
                    <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleInputChange} tabIndex='-1' autoComplete="off"></input>
                    <div className='save-exercise-symbol-container'>
                        <AddIcon 
                            type="submit"
                            className={`save-exercise-symbol ${themeClass}`}
                        />
                        <button type="submit" className="exercise-index-submit-btn" id="submit" >Save Exercise</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

