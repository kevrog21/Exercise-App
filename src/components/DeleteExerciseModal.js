import { ThemeContext } from './ThemeProvider'
import { useNavigateToLink } from './ToHomeScreen'
import { useContext, useState } from 'react'

export default function DeleteExerciseModal(props) {

const { closeDeleteModal, setDeleteExerciseMode, exerciseName, currentID } = props
const [formData, setFormData] = useState({
    pword: '',
    honeyp: ''
})

const navigate = useNavigateToLink()
    
const { theme } = useContext(ThemeContext)

const themeClass = `${theme}-theme`

const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
    }))
}

const addRefreshToLocalStorage = () => {
    localStorage.setItem('refreshIndexData', true)
}

const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('delete exerise formData here: ', formData)

    if (formData.honeyp === '') {
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
    
                    const deletionResponse = await fetch(`https://dailyfitchallenge.com/exercise-index-data/${currentID}`, {
                        method: "DELETE",
                        body: JSON.stringify(formData),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    if (!deletionResponse.ok) {
                        throw new Error('Failed to delete exercise from exercise index')
                    }
                    addRefreshToLocalStorage()
                    setDeleteExerciseMode(false)
                    navigate('/exercise-index')
                    console.log('SUCCESSFULLY DELETED!')
            }
        } catch (error) {
            console.error('error: ', error.message)
        }
    }
}

    return (
        <div className={`delete-modal-container ${themeClass}`} >
            <div className="x-button-container" onClick={(closeDeleteModal)}>
                <div className="x-1"  onClick={closeDeleteModal}></div>
                <div className="x-2"  onClick={closeDeleteModal}></div>
            </div>
            
            <div className='modal-content-container'>
                <form onSubmit={handleSubmit} className='add-exercise-form'>
                    <div>Are you sure you want to delete <h3 className='delete-name'>{exerciseName}?</h3></div>
                    <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleInputChange} tabIndex='-1' autoComplete="off"></input>
                    <div className='delete-pword-container'>
                        <label htmlFor='pword' className='delete-input-label'>password:</label>
                        <input type='password' className='delete-password' name='pword' value={formData.pword} onChange={handleInputChange}></input>
                    </div>
                    <button type="submit" className="delete-submit-btn" id="submit" >Delete</button>
                </form>

            </div>
        </div>
    )
}