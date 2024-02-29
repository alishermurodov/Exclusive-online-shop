import React from 'react'
import styles from './progress.module.css'

const Progress = (props) => {
    return (
        <>
            <div
                style={{
                    color: props.color,
                    background: props.background,
                    border: props.border
                }}
                className={styles.container}
            >
                <img src={props.img} alt="" />
                <div className={styles.info}>
                    <h1
                    style={{fontSize: props.fontSize}}
                    >{props.amount}</h1>
                    <p>{props.desc}</p>
                </div>
            </div>
        </>
    )
}

export default Progress