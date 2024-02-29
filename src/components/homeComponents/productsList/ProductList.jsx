import React, { useEffect } from 'react'
import styles from '../../../pages/Home/home.module.css'
import ProductCard from '../../productCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getSubcategories, setCartList, setCartListCounter, setWishList, setWishlistCounter } from '../../../store/features/products/productSlice'

//gif loading
import doubleRing from '../../../assets/checkout/DoubleRing.gif'
import ring from '../../../assets/checkout/Gear.gif'
import SaleType from '../saleHeader/SaleType'
import { useTranslation } from 'react-i18next'

const ProductList = () => {
    //product list
    const productList = useSelector(state => state.products.productList)
    //subcategoriesList
    const subcategoriesList = useSelector((state) => state.products.subcategoriesList)
    //cart list
    const cartList = useSelector(state => state.products.cartList)
    //wish list
    const wishList = useSelector(state => state.products.wishList)
    //loading
    const loading = useSelector(state => state.products.isLoading)
    const dispatch = useDispatch()


    function handleProduct(product) {
        let haveProduct = cartList.filter((prod) => prod.id === product.id)
        if (haveProduct.length == 0) {
            dispatch(setCartList(product))
            dispatch(setCartListCounter())
        }
    }
    
    function handleProductWish(product) {
        let haveProduct = wishList.filter((prod) => prod.id === product.id);
        if (haveProduct.length === 0) {
            // console.log("Adding to wishlist:", product);
            dispatch(setWishList(product));
            dispatch(setWishlistCounter());
        } else {
            // console.log("Product already in wishlist:", product);
        }
    }

    // translation 
    const { t, i18n } = useTranslation()


    useEffect(() => {
        dispatch(getProducts())
        dispatch(getSubcategories())
    }, [])

    return (

        <>
            <div className={styles.allProductsDiv}>
                <div className="">
                    <SaleType
                        dataSale={t('The hottest discounts 🔥')}
                    />
                    <div className={styles.exterProductsInCtgDiv}>
                        <div className={styles.productsInCtgDiv}>
                            {
                                productList && productList.map((product) => {
                                    if ((Math.ceil(100 - (product.discount * 100) / product.price) > 25) && product.hasDiscount) {
                                        return (
                                            <div key={product.id}>
                                                <ProductCard
                                                    hasDiscount={product.hasDiscount}
                                                    discountPresent={Math.ceil(100 - (product.discount * 100) / product.price)}
                                                    img={product.media[0].src}
                                                    productName={product.name}
                                                    discount={product.discount}
                                                    price={product.price}
                                                    productId={product.id}
                                                    onClickCart={() => handleProduct(product)}
                                                    onClickHeart={() => handleProductWish(product)}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    subcategoriesList && subcategoriesList.map((subcategory) => {
                        return (
                            <div
                                key={subcategory.id}
                                className={styles.categoryDiv}
                            >
                                <SaleType
                                    dataSale={t(subcategory.nickname)}
                                />
                                <div className={styles.exterProductsInCtgDiv}>
                                    <div className={styles.productsInCtgDiv}>
                                        {
                                            productList && productList.map((product) => {
                                                if (product.subCategoryId == subcategory.id) {
                                                    return (
                                                        <div
                                                            key={product.id}
                                                            className=""
                                                        >
                                                            <ProductCard

                                                                hasDiscount={product.hasDiscount}
                                                                discountPresent={Math.ceil(100 - (product.discount * 100) / product.price)}
                                                                img={product.media[0].src}
                                                                productName={product.name}
                                                                discount={product.discount}
                                                                price={product.price}
                                                                productId={product.id}
                                                                onClickCart={() => handleProduct(product)}
                                                                onClickHeart={() => handleProductWish(product)}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductList