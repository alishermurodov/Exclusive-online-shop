import React, { useEffect } from 'react'
import styles from './categoryList.module.css'
import SaleType from '../saleHeader/SaleType'
import { useDispatch, useSelector } from 'react-redux'
import { getSubcategories } from '../../../store/features/products/productSlice'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CircularWithValueLabel from '../../progress/Progress'

const CategoryList = () => {
    const dispatch = useDispatch()
    //subcategoriesList
    const subcategoriesList = useSelector((state) => state.products.subcategoriesList)
    //loading
    const loading = useSelector((state) => state.products.isLoading)
    // translation 
    const { t, i18n } = useTranslation()

    useEffect(() => {
        dispatch(getSubcategories())
    }, [])
    return (
        <>
            <SaleType dataSale={t("Popular Categories")} />
            {
                loading ?
                    <div style={{ minHeight: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularWithValueLabel />
                    </div>
                    :
                    <div className={styles.container}>
                        <div className={styles.categoriesDiv}>
                            {
                                subcategoriesList && subcategoriesList.map((category) => {
                                    return (
                                        <div
                                            key={category.id}
                                        >
                                            <Link to={`/products/${category.id}`}>
                                                <div className={styles.categoryCard}>
                                                    <div className={styles.categoryImg}>
                                                        <img src={category.img} alt="" />
                                                    </div>
                                                    <p
                                                        className='dark:text-[#fff] text-[#000] hover:text-[red]'
                                                    >{t(category.name)}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
            }

        </>
    )
}

export default CategoryList