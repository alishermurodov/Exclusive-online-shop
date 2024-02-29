import React from 'react'
import styles from './wishlist.module.css'

//mui
import { Button } from '@mui/material'
import WishlistCard from '../../components/wishlistComponents/WishlistCard'

// img
import iphone13 from '../../assets/wishlist/1iphone-13.webp'
import macPro from '../../assets/wishlist/2macbook-pro-16.webp'
import SaleType from '../../components/homeComponents/saleHeader/SaleType'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromWishlist, pushAllWishToCart, setCartList, setCartListCounter } from '../../store/features/products/productSlice'
import favourite from '../../assets/wishlist/favorites.svg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'



const Wishlist = () => {
  //products
  const products = useSelector(state => state.products.wishList)
  //cartList
  const cartList = useSelector(state => state.products.cartList)
  
  const dispatch = useDispatch()

  function handleProduct(product) {
    let haveProduct = cartList.filter((prod) => prod.id === product.id)
    if (haveProduct.length == 0) {
      dispatch(setCartList(product))
      dispatch(setCartListCounter())
    }
  }

  //translation
  const { t, i18n } = useTranslation()

  return (
    <>
      {
        products.length > 0 ?
          <div className={styles.container}>
            <div className={styles.topHeader}>
              <h3>Wishlist <span>(4)</span></h3>
              <Button
                sx={{ height: "46px", width: "190px" }}
                color="error"
                variant="contained"
                onClick={() => dispatch(pushAllWishToCart())}
              >
                {t("Move All To Bag")}
              </Button>
            </div>
            <div className={styles.containerCards}>
              {
                products.map((product) => {
                  return (
                    <WishlistCard
                      key={product.id}
                      hasDiscount={product.discount}
                      discountPresent={Math.ceil(100 - (product.discount * 100) / product.price)}
                      img={product.media[0].src}
                      productName={product.name}
                      discount={product.discount}
                      price={product.price}
                      onClickDelete={() => dispatch(deleteFromWishlist(product))}
                      productId={product.id}
                      onClickAdd={() => handleProduct(product)}
                    />
                  )
                })
              }
            </div>
            <div className={styles.topHeader}>
              <SaleType
                dataSale={t('Just For You')}
              />
              <Button
                sx={{ height: "46px", width: "190px" }}
                color="error"
                variant="contained"
              >
                {t("See All")}
              </Button>
            </div>
          </div>
          :
          <div className={styles.emptyDiv}>
            <img src={favourite} alt="" />
            <h2>{t("Not ready to purchase yet?")}</h2>
            <p>{t("Click ❤️ on the product page and add what you like here. And if the prices for these items drop, we'll notify you.")}
            </p>
            <Link to={'/'}>
              <Button
                sx={{ height: "46px", width: "190px" }}
                color="error"
                variant="contained"
              >
                {t("To Home")}
              </Button>
            </Link>
          </div>
      }

    </>
  )
}

export default Wishlist