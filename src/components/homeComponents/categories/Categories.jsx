import React, { useState } from 'react'
import styles from './categories.module.css'

// img 
import phone from '../../../assets/home/categorySvg/CellPhone.svg'
import computers from '../../../assets/home/categorySvg/Computer.svg'
import smartWatch from '../../../assets/home/categorySvg/SmartWatch.svg'
import camera from '../../../assets/home/categorySvg/Camera.svg'
import headPhones from '../../../assets/home/categorySvg/Headphone.svg'
import gaming from '../../../assets/home/categorySvg/Gamepad.svg'
import phone2 from '../../../assets/home/categorySvg/CellPhone2.svg'
import computers2 from '../../../assets/home/categorySvg/Computer2.svg'
import smartWatch2 from '../../../assets/home/categorySvg/SmartWatch2.svg'
import camera2 from '../../../assets/home/categorySvg/Camera2.svg'
import headPhones2 from '../../../assets/home/categorySvg/Headphone2.svg'
import gaming2 from '../../../assets/home/categorySvg/Gamepad2.svg'


const categories = [
    {
        id: 1,
        categoryName: 'Phones',
        img: [phone, phone2]
    },
    {
        id: 2,
        categoryName: 'Computers',
        img: [computers, computers2]
    },
    {
        id: 3,
        categoryName: 'SmartWatch',
        img: [smartWatch, smartWatch2]
    },
    {
        id: 4,
        categoryName: 'Camera',
        img: [camera, camera2]
    },
    {
        id: 5,
        categoryName: 'HeadPhones',
        img: [headPhones, headPhones2]
    },
    {
        id: 6,
        categoryName: 'Gaming',
        img: [gaming, gaming2]
    },
]

const Categories = () => {

    const [selectedCotegory, setSelectedCotegory] = useState(null)

    function handleCategory(category){
        if(selectedCotegory === category){
            setSelectedCotegory(null)
        }else{
            setSelectedCotegory(category)
        }
    }

    return (
        <>
            <div className={styles.categoriesContainer}>
                {
                    categories?.map((category) => {
                        return (
                            <div
                                onClick={() =>
                                    handleCategory(category.categoryName)
                                }
                                style={{ 
                                    background: selectedCotegory === category.categoryName ? '#DB4444' : '#fff',
                                    border:selectedCotegory === category.categoryName ? 'none': '1px solid black'
                                }}
                                className={styles.cotegory}
                                key={category.id}
                            >
                                <img src={
                                    selectedCotegory === category.categoryName ? category.img[1] :
                                        category.img[0]
                                } alt=""
                                />
                                <p
                                style={{
                                    color: selectedCotegory === category.categoryName ? '#fff' : '#000'
                                }}
                                >{category.categoryName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Categories