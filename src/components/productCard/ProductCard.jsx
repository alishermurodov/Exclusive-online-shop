import React, { useState } from 'react'
import styles from './productCard.module.css'

// img
import heart from '../../assets/home/Heart.svg'
import eye from '../../assets/home/Eye.svg'
import cartIcon from '../../assets/home/cartIcon.svg'
import RatingJon from './Rating'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {

    const [buttonAddToCart, setButtonAddToCart] = useState(false)

    return (
        <>
            <div
                onMouseEnter={(() => setButtonAddToCart(true))}
                onMouseLeave={() => setButtonAddToCart(false)}
                className={styles.card}
            >
                <div className={styles.cardView}>
                    <div className="">
                        <div
                            style={{ justifyContent: props.hasDiscount ? 'space-between' : 'right' }}
                            className={styles.cardHeader}
                        >
                            {
                                props.hasDiscount ?
                                    <div className={styles.discount}>
                                        <span>-{props.discountPresent}%</span>
                                    </div> :
                                    null
                            }

                            <div className={styles.wishAndCart}>
                                <img
                                    onClick={() => props.onClickHeart()}
                                    src={heart}
                                />
                                <Link to={`/visitProduct/${props.productId}`}>
                                    <img src={eye} />
                                </Link>
                            </div>
                        </div>
                        <Link to={`/visitProduct/${props.productId}`}>
                            <div className={styles.cartImg}>
                                <img src={props.img} alt="product Name" />
                            </div>
                        </Link>
                    </div>
                    {
                        buttonAddToCart ?
                            <button
                                onClick={() => props.onClickCart()}
                            >
                                <img src={cartIcon} alt="" />
                                <span>Add To Cart</span>
                            </button> :
                            null
                    }
                </div>
                <div className={styles.CartData}>
                    <p>{props.productName}</p>
                    <div>
                        {
                            props.hasDiscount ?
                                <div className={styles.prices}>
                                    <span
                                        style={{ color: '#DB4444' }}
                                    >${props.discount}</span>
                                    <span style={{
                                        textDecoration: props.hasDiscount ? 'line-through' : 'none',
                                        color: props.hasDiscount ? '#888' : '#DB4444'
                                    }}>${props.price}</span>
                                </div> :
                                <span style={{
                                    color: '#DB4444'
                                }}>${props.price}</span>
                        }

                    </div>
                    <RatingJon />
                </div>
            </div>
        </>
    )
}

export default ProductCard