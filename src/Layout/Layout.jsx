import React, { useState } from 'react'
import styles from './Layout.module.css'
import { Link, Outlet, useLocation } from 'react-router-dom'
// img 
import wishlistIcon from '../assets/layout/Wishlist.png'
import cartIcon from '../assets/layout/Cart.png'
import iconFacebook from '../assets/layout/Icon-Facebook.png'
import iconTwitter from '../assets/layout/Icon-Twitter.png'
import iconInstagram from '../assets/layout/icon-instagram.png'
import iconLinkedin from '../assets/layout/Icon-Linkedin.png'
import Burger from '../components/Burger/Burger'
import Switcher from '../components/Switcher/Switcher'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const Layout = () => {

    const { pathname } = useLocation()
    const cartCounter = useSelector(state => state.products.cartListCounter)
    const existCounter = cartCounter >= 1;

    const wishCounter = useSelector(state => state.products.wishListCounter)
    const existCounterWish = wishCounter >= 1;

    // loading
    const loading = useSelector(state => state.products.isLoading)

    //transition
    const { t, i18n } = useTranslation()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    const active = localStorage.getItem("i18nextLng")

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className={styles.topAndHeader}>
                <div
                    style={{ background: '#000' }}>
                    <div className={styles.topHeader}>
                        <p>{t("Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!")}
                        </p>
                        <div className={styles.languages}>
                            <span style={{ color: active == "en" ? 'lime' : null }} onClick={() => changeLanguage("en")}>en</span>
                            <span style={{ color: active == "ru" ? 'lime' : null }} onClick={() => changeLanguage("ru")}>ru</span>
                            <Switcher />
                        </div>
                    </div>
                </div>
                <header>
                    <div className={styles.burgerDiv}>
                        <Link to="/">
                            <h2 className='dark:text-white' style={{ transition: '.3s', }}>Exclusive</h2>
                        </Link>
                        <div className={styles.burger}>
                            <Burger />
                        </div>
                    </div>
                    <ul>
                        <Link to="/">
                            <li
                                className='dark:text-[#c2bfbf]'
                                style={{ borderBottom: pathname == '/' ? '2px solid #000000' : 'none' }}
                            >{t("Home")}</li>
                        </Link>
                        <Link to="contact">
                            <li
                                className='dark:text-[#c2bfbf]'
                                style={{ borderBottom: pathname == '/contact' ? '2px solid #000000' : 'none' }}
                            >{t("Contact")}</li>
                        </Link>
                        <Link to="about">
                            <li
                                className='dark:text-[#c2bfbf]'
                                style={{ borderBottom: pathname == '/about' ? '2px solid #000000' : 'none' }}
                            >{t("About")}</li>
                        </Link>
                        {/* <Link to="login">
                            <li
                                className='dark:text-[#c2bfbf]'
                                style={{ borderBottom: pathname == '/login' ? '2px solid #000000' : 'none' }}
                            >{t("Log in")}</li>
                        </Link> */}

                    </ul>
                    <div className={styles.headerTools}>
                        <input
                            type="search"
                            placeholder={t("What are you looking for?")}
                        />
                        <Link to="wishlist">
                            <div className={styles.indexDiv}>
                                <img src={wishlistIcon} />
                                {
                                    existCounterWish ?
                                        <div className={styles.index}>{wishCounter}</div>
                                        :
                                        null
                                }
                            </div>
                        </Link>
                        <Link to="cart">
                            <div className={styles.indexDiv}>
                                <img src={cartIcon} />
                                {
                                    existCounter ?
                                        <div className={styles.index}>{cartCounter}</div>
                                        :
                                        null
                                }
                            </div>
                        </Link>
                    </div>
                </header>
            </div>
            <main
                style={{ opacity: loading ? '1' : '1' }}
                className={"dark:bg-[#272727] dark:text-white"}
            >
                <Outlet />
            </main>
            <footer>
                <div className={styles.footerBlock}>
                    <div className={styles.footerDiv}>
                        <h2>Exclusive</h2>
                        <h3>{t("Subscribe")}</h3>
                        <p>{t("Get 10% off your first order")}</p>
                        <input
                            style={{ width: '90%px', height: '44px', outline: 'none', border: '1px solid #888', background: 'inherit', borderRadius: 4, paddingLeft: 10, color: 'white' }}
                            placeholder={t("Enter your email")}
                        />
                    </div>
                    <div className={styles.footerDiv}>
                        <h3>{t("Support")}</h3>
                        <p>{t("111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.")}</p>
                        <p>exclusive@gmail.com</p>
                        <p>+88015-88888-9999</p>
                    </div>
                    <div className={styles.footerDiv}>
                        <h3>{t("Account")}</h3>
                        {/* <p>{t("My Account")}</p> */}
                        <Link to={'cart'}>
                            <p style={{color: '#fff'}}>{t("Cart")}</p>
                        </Link>
                        <p>{t("Wishlist")}</p>
                        <p>{t("Shop")}</p>
                    </div>
                    <div className={styles.footerDiv}>
                        <h3>{t("Quick Link")}</h3>
                        <p>{t("Privacy Policy")}</p>
                        <p>{t("Terms Of Use")}</p>
                        <p>{t("FAQ")}</p>
                        <p>{t("Contact")}</p>
                    </div>
                    <div className={styles.footerDiv}>
                        <h3>{t("")}Social</h3>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <img src={iconFacebook} />
                            <img src={iconTwitter} />
                            <img src={iconInstagram} />
                            <img src={iconLinkedin} />
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '.3px solid #fff', paddingTop: 16 }}>
                    <p style={{ opacity: '.3', textAlign: 'center' }}>{t("Copyright Rimel 2022. All right reserved")}</p>
                </div>
            </footer>
        </div>
    )
}

export default Layout