import { useState } from 'react'
import { ReactComponent as FilterIcon } from '../assets/filter_icon.svg'

export default function CategorySelect(props) {

    const { selectedCategory, setSelectedCategory, uniqueCategories, theme } = props

    const [ isOpen, setIsOpen] = useState(false)

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        localStorage.setItem('selectedCategory', category)
        window.scrollTo(0, 0)
        setIsOpen(false)
    }

    return (
        <div className='category-button-wrapper'>
            <div className={`current-category-display ${theme}-theme`} onClick={toggleDropDown}>
                <span className='filter-text'>{selectedCategory}</span>
                <FilterIcon 
                    className={`filter-icon ${theme}-theme`}
                />
            </div>
            { isOpen && (
                <div className='option-select-container'>
                    { selectedCategory !== 'all' && (
                        <div key='all'  onClick={() => handleCategorySelect('all')}>
                            all
                        </div>
                    )}
                    {uniqueCategories.map((category, index) => (
                        <div key={index} className={`${selectedCategory === category ? 'selected' : ''}`} onClick={() => handleCategorySelect(category)}>
                            {category}
                        </div>
                    ))

                    }
                </div>
            )
            }
        </div>
    )
}