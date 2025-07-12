import React, { useState } from 'react'
import styles from '.././productCard/productCard.module.css';

// img
import deleteIcon from '../../assets/wishlist/delete-icon.svg'
import cartIcon from '../../assets/home/CartIcon.svg'
import RatingJon from '.././productCard/Rating'
import { Link } from 'react-router-dom';

const WishlistCard = (props) => {

    const [buttonAddToCart, setButtonAddToCart] = useState(true)

    return (
        <>
            <div
                className={styles.card}
            >
                <div className={styles.cardView}>
                    <div className="">
                        <div
                            style={{ justifyContent: props.hasDiscount ? 'space-between' : 'right' }}
                            className={styles.cardHeader2}
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
                                    onClick={() => props.onClickDelete()}
                                    src={deleteIcon} />
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
                                onClick={() => props.onClickAdd()}
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

export default WishlistCard
