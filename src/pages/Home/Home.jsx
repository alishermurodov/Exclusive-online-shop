import React, { useEffect } from 'react'
import styles from './home.module.css'
import SwipeApple from '../../components/homeComponents/swipperAd/SwipperAd'
import SaleType from '../../components/homeComponents/saleHeader/SaleType'
import Categories from '../../components/homeComponents/categories/Categories'
import ProductList from '../../components/homeComponents/productsList/ProductList'
import CategoryList from '../../components/homeComponents/categoryList/CategoryList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const Home = () => {
    // const isAuth = useSelector((state) => state.auth.isAuth);
    // const navigate = useNavigate();
    // console.log(isAuth);
    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('/login')
    //     }
    // }, [isAuth])
    return (
        <>
            <div className={styles.container}>
                <div className="">
                    <CategoryList />
                    <ProductList />
                </div>
            </div>
        </>
    )
}

export default Home