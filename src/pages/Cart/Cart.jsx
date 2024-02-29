import React, { useEffect, useState } from 'react'
import styles from './cart.module.css'


///mui
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFfromCart, setCartList, setCartListCounter, setCartTotal, setQuantity, setWishList, setWishlistCounter } from '../../store/features/products/productSlice';
import ProductCard from '../../components/productCard/ProductCard';
import { useTranslation } from 'react-i18next';


const Cart = () => {

  //cartlist data
  const products = useSelector((state) => state.products.cartList)
  //recentList data
  const recentList = useSelector((state) => state.products.recentList)
  //wishList
  const wishList = useSelector(state => state.products.wishList)
  //quantity
  const quantity = useSelector(state => state.products.quantity)
  //cartTotal
  const cartTotal = useSelector(state => state.products.cartTotal)

  const dispatch = useDispatch()


  //send recent Product to Redux
  function handleProduct(product) {
    let haveProduct = products.filter((prod) => prod.id === product.id)
    if (haveProduct.length == 0) {
      dispatch(setCartList(product))
      dispatch(setCartListCounter())
    }
  }

  //from recent list to Wishlist
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

  //translation
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const initialCartTotal = products.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    dispatch(setCartTotal(initialCartTotal));
  }, [products, dispatch]);
  

  return (
    <>
      <div className={styles.container}>
        <p className={styles.pageName}><span style={{ opacity: '.4' }}>Home /</span>Cart</p>
        {
          products.length > 0 ?
            <div className={styles.tableBody}>
              <div className={styles.tableHead}>
                <p style={{ width: '30%' }}>{t("Product")}</p>
                <p style={{ width: '12%' }}>{t("Price")}</p>
                <p style={{ width: '5%' }}>{t("Quantity")}</p>
                <p>{t("Subtotal")}</p>
                <p></p>
              </div>
              <div className={styles.tableBody}>
                {
                  products.map((product) => {
                    const shorteredName = product.name.length > 24 ?
                      product.name.slice(0, 20) + '...' :
                      product.name
                      // const [value, setValue] = useState(1)
                    return (
                      <div
                        key={product.id}
                        className={styles.tableHead}
                      >
                        <div style={{ width: '31%' }} className={styles.prodImgName}>
                          <img src={product.media[0].src} />
                          <p>{shorteredName}</p>
                        </div>
                        <p style={{ width: '13%' }}>${product.price}</p>
                        <div className={styles.textFieldNum}>
                          <TextField
                            id="demo-helper-text-misaligned"
                            type='number'
                            value={product.quantity}
                            onChange={(e) => {
                              const newQuantity = Number(e.target.value);
                              const validQuantity = Math.max(newQuantity, 1);
                              dispatch(setQuantity({ productId: product.id, quantity: validQuantity }));
                          }}
                            size='small'
                          />
                        </div>
                        <p style={{ width: 60 }}>${(product.price) * (product.quantity)}</p>
                        <div className={styles.deleteIcon} style={{ width: '-5%' }}>
                          <span onClick={() => dispatch(deleteFfromCart(product))}>❌</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="">
                <Link to={'/'}>
                  <Button
                    sx={{ height: "46px", width: "190px" }}
                    color="error"
                    variant="contained"
                  >
                    {t("Return To Shop")}
                  </Button>
                </Link>
              </div>
              <div className={styles.proccesDiv}>
                <div className={styles.proccesCart}>
                  <h3>{t("Cart Total")}</h3>
                  <div className={styles.proccesRow}>
                    <p>{t("Subtotal")}:</p>
                    <p>${cartTotal}</p>
                  </div>
                  <div className={styles.proccesRow}>
                    <p>{t("Shipping")}:</p>
                    <p>{t("Free")}</p>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <div className={styles.proccesRow}>
                    <h3>{t("Subtotal")}:</h3>
                    <h3>${cartTotal}</h3>
                  </div>
                  <Link to={'/checkout'}>
                    <Button
                      sx={{ height: "46px", width: "80%", fontSize: "12px", marginLeft: '10%' }}
                      color="error"
                      variant="contained"
                    >
                      {t("Procees to checkout")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div> :
            <div className={styles.emptyDiv}>
              <p style={{ fontSize: 120 }}>🛒</p>
              <h1>{t("Add the items you need to your cart")}</h1>
              <h3>{t("To find them, look in the catalog or to the discount section")}</h3>
              <Link to={'/'}>
                <Button
                  sx={{ height: "42px", width: "200px", fontSize: "16px", marginLeft: '10%' }}
                  color="error"
                  variant="contained"
                >
                  {t("To Home")}
                </Button>
              </Link>
            </div>
        }
        <h2>{t("You watched recently")}</h2>
        <div className={styles.recentDiv}>
          {
            recentList.slice(-5).reverse().map((product) => {
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
            })
          }
        </div>
      </div>
    </>
  )
}

export default Cart