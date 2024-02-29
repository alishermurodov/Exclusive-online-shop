import React, { useEffect } from 'react'
import styles from './checkout.module.css'

//mui
import TextField from '@mui/material/TextField';
import { Button, Checkbox } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//img
import mac from '../../assets/wishlist/2macbook-pro-16.webp'
import iphone13 from '../../assets/wishlist/1iphone-13.webp'
import cart1 from '../../assets/checkout/Bkash.svg'
import cart2 from '../../assets/checkout/Mastercard.svg'
import cart3 from '../../assets/checkout/Visa.svg'
import cart4 from '../../assets/checkout/Nagad.svg'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Checkout = () => {

  const cartList = useSelector(state => state.products.cartList)
  const cartTotal = useSelector(state => state.products.cartTotal)
  //translation
  const { t, i18n } = useTranslation()

  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  console.log(isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])
  return (
    <>
      <div className={styles.container}>
        <p style={{ fontSize: 14 }}><span style={{ opacity: .4 }}>Account / My Account / Product / View Cart / </span>CheckOut</p>
        <div className={styles.containerSides}>
          <div className={styles.leftSide}>
            <h1>{t("Billing Details")}</h1>
            <div className={styles.leftSideInputs}>
              <TextField size='small' id="outlined-basic" label={t("First name")} variant="outlined" />
              <TextField size='small' id="outlined-basic" label={t("Last name")} variant="outlined" />
              <TextField size='small' id="outlined-basic" label={t("Street address")} variant="outlined" />
              <TextField size='small' id="outlined-basic" label={t("Apartment, floor, etc. (optional)")} variant="outlined" />
              <TextField size='small' id="outlined-basic" label={t("Town/City")} variant="outlined" />
              <TextField size='small' id="outlined-basic" label={t("Phone number")} variant="outlined" />
              <TextField size='small' id="outlined-basic" label={t("Email address")} variant="outlined" />
            </div>
            <FormControlLabel
              style={{ fontSize: 12 }}
              control={<Checkbox color='error' name="myCheckbox" />}
              label={t("Save this information for next time")}
            />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.productsInCheckoutDiv}>
              {
                cartList && cartList.map((product) => {
                  return (
                    <div className={styles.productInCheckout}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <img src={product.media[0].src} alt="" />
                        <p>{product.name}</p>
                      </div>
                      <p>${product.hasDiscount? product.discount:product.price}</p>
                    </div>
                  )
                })

              }
            </div>
            <div className={styles.productsInCheckoutDiv}>
              <div className={styles.productInCheckout}>
                <p>{t("Subtotal")}:</p>
                <p>${cartTotal}</p>
              </div>
              <div className={styles.productInCheckout}>
                <p>{t("Shipping")}:</p>
                <p>{t("Free")}</p>
              </div>
              <hr style={{ margin: 0 }} />
              <div className={styles.productInCheckout}>
                <h3>{t("Total")}:</h3>
                <h3>${cartTotal}</h3>
              </div>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
              // value={value}
              // onChange={handleChange}
              >
                <div className={styles.productInCheckout}>
                  <FormControlLabel value="Bank" control={<Radio />} label={t("Bank")} />
                  <div className={styles.bankCards}>
                    <img src={cart1} alt="" />
                    <img src={cart2} alt="" />
                    <img src={cart3} alt="" />
                    <img src={cart4} alt="" />
                  </div>
                </div>
                <FormControlLabel value="Cash on delivery" control={<Radio />} label={t("Cash on delivery")} />
              </RadioGroup>
              <Button
                sx={{ height: "46px", width: "190px", fontSize: "12px" }}
                color="error"
                variant="contained"
              >
                {t("Place Order")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout