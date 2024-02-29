import React from 'react'
import styles from './saleHeader.module.css'

const SaleType = (props) => {
    return (
        <>
            <div style={{marginBottom: 60}}>
                <div className="container flex gap-[16px] items-center mb-[20px]">
                    <div className="shape bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]"></div>
                    <p className='text-[24px] font-[600]'>{props.dataSale}</p>
                </div>
                <h2 className='text-[32px] md:text-[48px] font-[600]'>{props.category}</h2>
            </div>
        </>
    )
}

export default SaleType