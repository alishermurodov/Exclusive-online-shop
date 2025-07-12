import React, { useEffect, useState } from 'react'
import styles from './visitProduct.module.css'

//img
import first from '../../assets/visitProduct/1s22.webp.webp'
import second from '../../assets/visitProduct/2s22.webp'
import third from '../../assets/visitProduct/3s22.webp'
import fourth from '../../assets/visitProduct/4s22.webp'
import RatingJon from '../../components/productCard/Rating'
import { Button } from '@mui/material'
import heart from '../../assets/home/Heart.svg'
import delivery from '../../assets/visitProduct/icon-delivery.svg'
import retirnIcon from '../../assets/visitProduct/Icon-return.svg'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByID, setCartList, setCartListCounter, setSelectedProduct, setWishList, setWishlistCounter } from '../../store/features/products/productSlice'
import SaleType from '../../components/homeComponents/saleHeader/SaleType'
import ProductCard from '../../components/productCard/ProductCard'
import { useTranslation } from 'react-i18next'
import CircularWithValueLabel from '../../components/progress/Progress'



const VisitProduct = () => {

  const { productId } = useParams()
  // console.log(productId);
  const dispatch = useDispatch()

  //selectedProduct
  const selectedProduct = useSelector(state => state.products.selectedProduct)
  //cartList
  const cartList = useSelector(state => state.products.cartList)
  //wishList
  const wishList = useSelector(state => state.products.wishList)
  //productList
  const productList = useSelector(state => state.products.productList)
  const relatedList = selectedProduct
    ? productList.filter(product => product.subCategoryId === selectedProduct.subCategoryId && product.brandId == selectedProduct.brandId && product.id !== selectedProduct.id)
    : [];

  const [selectedImg, setSelectedImg] = useState()


  useEffect(() => {
    if (productId) {
      dispatch(getProductByID(productId))
    }
    return () => {
      dispatch(setSelectedProduct(null))
    }
  }, [productId, dispatch])

  useEffect(() => {
    if (selectedProduct && selectedProduct.media && selectedProduct.media.length > 0) {
      setSelectedImg(selectedProduct.media[0].src)
    }
  }, [selectedProduct])

  function handleImage(img) {
    setSelectedImg(img)
  }

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
      dispatch(setWishList(product));
      dispatch(setWishlistCounter());
    } else {
      // console.log(product);
    }
  }
  
  //translation
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className={styles.container}>
        <p><span>Account / Gaming / </span>Product</p>
        {
          selectedProduct ?

            <div className={styles.bothSides} key={selectedProduct.id}>
              <div className={styles.leftSide}>
                <div className={styles.littleImg}>
                  <img
                    onClick={() => handleImage(selectedProduct.media[0].src)}
                    style={{ border: selectedImg == selectedProduct.media[0].src ? '2px solid gold' : '', borderRadius: 4 }}
                    className={styles.image}
                    src={selectedProduct.media[0].src}
                  />
                  <img
                    onClick={() => handleImage(selectedProduct.media[1].src)}
                    style={{ border: selectedImg == selectedProduct.media[1].src ? '2px solid gold' : '', borderRadius: 4 }}
                    className={styles.image}
                    src={selectedProduct.media[1].src}
                  />
                  <img
                    onClick={() => handleImage(selectedProduct.media[2].src)}
                    style={{ border: selectedImg == selectedProduct.media[2].src ? '2px solid gold' : '', borderRadius: 4 }}
                    className={styles.image}
                    src={selectedProduct.media[2].src}
                  />
                  <img
                    onClick={() => handleImage(selectedProduct.media[3].src)}
                    style={{ border: selectedImg == selectedProduct.media[3].src ? '2px solid gold' : '', borderRadius: 4 }}
                    className={styles.image}
                    src={selectedProduct.media[3].src}
                  />
                </div>
                <div className={styles.bigImg}>
                  <img className={styles.image5} src={selectedImg} alt="" />
                </div>
              </div>
              <div className={styles.rigthSide}>
                <div className="">
                  <h2 style={{ fontWeight: 400 }}>{selectedProduct.name}</h2>
                  <RatingJon />
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    opacity: '.6',
                    marginBottom: 14
                  }}><span>{t("Code")}: </span>{selectedProduct.properties.id}</p>

                  <h2 style={{
                    fontWeight: 500,
                    fontSize: 36,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '13px'
                  }}
                  >
                    {selectedProduct.hasDiscount ? selectedProduct.discount : selectedProduct.price} $
                    <span style={{
                      textDecoration: 'line-through',
                      fontSize: 30,
                      opacity: '.4'
                    }}>
                      {selectedProduct.discount.length > 0 ? selectedProduct.price : ''}
                    </span>
                    {selectedProduct.discount.length > 0 ?
                      <span
                        style={{
                          padding: '5px 11px ',
                          background: '#DB4444',
                          borderRadius: '5px',
                          fontSize: '11px',
                          color: 'white',
                        }}
                      >
                        -{Math.ceil(100 - (selectedProduct.discount * 100) / selectedProduct.price)}%
                      </span>
                      :
                      ''
                    }

                  </h2>
                </div>
                <div className={styles.description}>
                  <hr style={{ margin: 0, width: '70%' }} />
                  <p ><span>{t("Brand")}: </span>{
                    selectedProduct.brandId == 1 ? 'LG' :
                      selectedProduct.brandId == 2 ? 'Xiaomi' :
                        selectedProduct.brandId == 3 ? 'Samsung' :
                          selectedProduct.brandId == 4 ? 'Apple' :
                            'Tecno'
                  }</p>
                  {
                    selectedProduct.subCategoryId == 1 ||
                      selectedProduct.subCategoryId == 9 ||
                      selectedProduct.subCategoryId == 10 ||
                      selectedProduct.subCategoryId == 11 ?
                      <div className={styles.propertyProduct}>
                        <p >
                          <span>
                            {t("Built-in memory")}:
                          </span> {selectedProduct.properties.memory}
                        </p>
                        <p ><span>{t("Diagonal")}: </span>{selectedProduct.properties.screen}</p>
                        <p ><span>{t("Battery")}: </span>{selectedProduct.properties.battery}</p>
                      </div>
                      :
                      selectedProduct.subCategoryId == 2 ?
                        <div className={styles.propertyProduct}>
                          <p >
                            <span>
                              {t("Material")}:
                            </span> {selectedProduct.properties.material}
                          </p>
                          <p ><span>{t("Color")}: </span> {selectedProduct.properties.color}</p>
                          <p ><span>{t("Battery")}: </span> {selectedProduct.properties.battery}</p>
                        </div>
                        :
                        selectedProduct.subCategoryId == 3 ||
                          selectedProduct.subCategoryId == 4 ?
                          <div className={styles.propertyProduct}>
                            <p >
                              <span>
                                {t("Connection Type")}:
                              </span> {selectedProduct.properties.connectionType}
                            </p>
                            <p ><span>{t("Color")}: </span> {selectedProduct.properties.color}</p>
                            <p ><span>{t("Battery")}: </span> {selectedProduct.properties.battery}</p>
                          </div>
                          :
                          selectedProduct.subCategoryId == 5 ?
                            <div className={styles.propertyProduct}>
                              <p >
                                <span>
                                  {t("Number of cameras")}:
                                </span> {selectedProduct.properties.cameras}
                              </p>
                              <p ><span>{t("Refrigerator volume")}: </span> {selectedProduct.properties.volume}</p>
                              <p ><span>{t("Freezer location")}: </span> {selectedProduct.properties.freezerLocation}</p>
                            </div>
                            :
                            selectedProduct.subCategoryId == 6 ?
                              <div className={styles.propertyProduct}>
                                <p >
                                  <span>
                                    {t("Heating power")}:
                                  </span> {selectedProduct.properties.power}
                                </p>
                                <p ><span>{t("Heated room area")}: </span> {selectedProduct.properties.area}</p>
                                <p ><span>{t("Color")}: </span> {selectedProduct.properties.color}</p>
                              </div>
                              :
                              selectedProduct.subCategoryId == 7 ?
                                <div className={styles.propertyProduct}>
                                  <p >
                                    <span>
                                      {t("color")}:
                                    </span> {selectedProduct.properties.color}
                                  </p>
                                  <p ><span>{t("Case material")}: </span> {selectedProduct.properties.material}</p>
                                  <p ><span>{t("Maximum heating temperature")}: </span> {selectedProduct.properties.temperature}</p>
                                </div>
                                :
                                selectedProduct.subCategoryId == 8 ?
                                  <div className={styles.propertyProduct}>
                                    <p >
                                      <span>
                                        {t("power")}:
                                      </span> {selectedProduct.properties.power}
                                    </p>
                                    <p ><span>{t("Case material")}: </span> {selectedProduct.properties.material}</p>
                                    <p ><span>{t("Jug capacity")}: </span> {selectedProduct.properties.volume}</p>
                                  </div>
                                  : null
                  }
                  <p >{selectedProduct.description}</p>
                </div>
                <hr style={{ margin: 0 }} />
                <div className={styles.counterBlock}>
                  {/* <div className={styles.counterDiv}>
                    <button>◀</button>
                    <div className={styles.counterDisplay}>1</div>
                    <button>▶</button>
                  </div> */}
                  <Link to={'/cart'}>
                    <Button
                      sx={{ height: "44px", width: "130px", fontSize: "12px" }}
                      color="error"
                      variant="contained"
                      onClick={()=>handleProduct(selectedProduct)}
                    >
                      {t("Buy Now")}
                    </Button>
                  </Link>
                  <img onClick={() => (handleProductWish(selectedProduct))} className={styles.heart} src={heart} alt="" />
                </div>
                <div className={styles.delivery}>
                  <div className={styles.deliveryRow}>
                    <img src={delivery} />
                    <div className="">
                      <p style={{ fontWeight: 500 }}>{t("Free Delivery")}</p>
                      <p style={{ fontSize: 12 }}>{t("Enter your postal code for Delivery Availability")}</p>
                    </div>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <div className={styles.deliveryRow}>
                    <img src={retirnIcon} />
                    <div className="">
                      <p style={{ fontWeight: 500 }}>{t("Free Delivery")}</p>
                      <p style={{ fontSize: 12 }}>{t("Enter your postal code for Delivery Availability")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            // <h1 style={{textAlign: 'center'}}>loading...</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularWithValueLabel />
            </div>
        }

      </div>
      <div className={styles.releatedDiv}>
        <SaleType
          dataSale={t('Related Item')}
        />
        <div className={styles.relatedElemsDiv}>
          {
            relatedList && relatedList.map((product) => {
              return (
                <div className="">
                  <ProductCard
                    key={product.id}
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

export default VisitProduct