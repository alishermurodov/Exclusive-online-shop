import React from 'react'
import styles from './founder.module.css'

import twitter from '../../../assets/about/Icon-Twitter.svg'
import instagram from '../../../assets/about/icon-instagram.svg'
import linkedin from '../../../assets/about/Icon-Linkedin.svg'

const FounderCard = (props) => {
    return (
        <>
            <div className={styles.container}>
                <img 
                className={styles.founderImg}
                src={props.img} />
                <div className="">
                    <h1>{props.name}</h1>
                    <p>{props.job}</p>
                    <div className={styles.socialIcons}>
                        <img src={twitter} />
                        <img src={instagram} />
                        <img src={linkedin} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FounderCard