import React, { useEffect, useState } from 'react'
import styles from './productsByCategory.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../components/productCard/ProductCard'
import { getBrands, getProducts, getSubcategories, setCartList, setCartListCounter, setWishList, setWishlistCounter } from '../../store/features/products/productSlice'

//mui
import TextField from '@mui/material/TextField';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next'
import CircularWithValueLabel from '../../components/progress/Progress'

const memoryCapacity = [
    {
        id: 1,
        value: '1000 gb'
    },
    {
        id: 2,
        value: '528 gb'
    },
    {
        id: 3,
        value: '256 gb'
    },
    {
        id: 4,
        value: '128 gb'
    },
    {
        id: 5,
        value: '64 gb'
    },
    {
        id: 6,
        value: '32 gb'
    },
]

const materials = [
    {
        id: 1,
        name: 'iron'
    },
    {
        id: 2,
        name: 'plastic'
    },
    {
        id: 3,
        name: 'stainless Steel'
    },
    {
        id: 4,
        name: 'aluminum'
    },
    {
        id: 5,
        name: 'glass'
    },
]
const colors = [
    {
        id: 3,
        name: 'white'
    },
    {
        id: 1,
        name: 'gray'
    },
    {
        id: 2,
        name: 'black'
    },
    {
        id: 4,
        name: 'brown'
    },
    {
        id: 5,
        name: 'pink'
    },
    {
        id: 6,
        name: 'milky'
    },
    {
        id: 7,
        name: 'red'
    },
]

const ProductsByCategory = () => {
    const dispatch = useDispatch()
    const { categoryId } = useParams()

    //productList
    const productList = useSelector((state) => state.products.productList)
    //loading
    const loading = useSelector((state) => state.products.isLoading)
    //categoriesList
    const categoriesList = useSelector((state) => state.products.subcategoriesList)
    //cart list
    const cartList = useSelector(state => state.products.cartList)
    //wish list
    const wishList = useSelector(state => state.products.wishList)
    //brand list
    const brandList = useSelector(state => state.products.brandsList)

    //states for filtering products
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedMemoryCapacities, setSelectedMemoryCapacities] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);


    //handle brand
    const handleBrandToggle = (brandId) => {
        if (selectedBrands.includes(brandId)) {
            // Remove the brand if it's already selected
            setSelectedBrands(selectedBrands.filter(id => id !== brandId));
        } else {
            // Add the brand if it's not selected
            setSelectedBrands([...selectedBrands, brandId]);
        }
    };

    //handle memory capacity
    const handleMemoryCapacityToggle = (capacity) => {
        if (selectedMemoryCapacities.includes(capacity)) {
            setSelectedMemoryCapacities(selectedMemoryCapacities.filter(item => item !== capacity));
        } else {
            setSelectedMemoryCapacities([...selectedMemoryCapacities, capacity]);
        }
    };

    //handle material
    const handleMaterialToggle = (material) => {
        if (selectedMaterials.includes(material)) {
            setSelectedMaterials(selectedMaterials.filter(item => item !== material));
        } else {
            setSelectedMaterials([...selectedMaterials, material]);
        }
    };

    // Handle color
    const handleColorToggle = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(item => item !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };


    const filterProductsByPrice = (product) => {
        //by price
        const productPrice = (product.hasDiscount ? product.discount : product.price);
        const minValid = isNaN(parseFloat(minPrice)) || productPrice >= parseFloat(minPrice);
        const maxValid = isNaN(parseFloat(maxPrice)) || productPrice <= parseFloat(maxPrice);

        //by brand
        const brandValid = selectedBrands.length === 0 || selectedBrands.includes(product.brandId);

        // by memory capacity
        const memoryCapacityValid =
            selectedMemoryCapacities.length === 0 ||
            selectedMemoryCapacities.includes(product.properties.memory);

        // by material
        const materialValid =
            selectedMaterials.length === 0 || selectedMaterials.includes(product.properties.material);

        // By color
        const colorValid =
            selectedColors.length === 0 || product.properties.color && selectedColors.includes(product.properties.color.toLowerCase());

        return minValid && maxValid && brandValid && memoryCapacityValid && materialValid && colorValid;
    };

    const filteredProducts = productList.filter((product) => {
        return product.subCategoryId == categoryId && filterProductsByPrice(product);
    });


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
        console.log('11111');
    }

    //translation
    const { t, i18n } = useTranslation()

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getSubcategories())
        dispatch(getBrands())
    }, [])

    return (
        <>
            {
                <div style={{ overflow: 'auto', height: '100vh' }}>
                    <div className={styles.container}>
                        <div className={styles.changableTitle}>
                            {
                                categoriesList && categoriesList.map((category) => {
                                    if (category.id == categoryId) {
                                        return (
                                            <h1 key={category.id}>{t(category.name)}</h1>
                                        )
                                    }
                                })
                            }
                            {
                                filteredProducts && (
                                    <p>{filteredProducts.filter(product => product.subCategoryId == categoryId).length} {t("products")}</p>
                                )
                            }
                        </div>
                        <div className={styles.main}>
                            {/* <div className={styles.exSlidebar}> */}
                            <div className={styles.sidebar}>
                                <div className={styles.sidebarItems}>
                                    <p className={styles.inputsTitle}>{t("Price")}</p>
                                    <div className={styles.sideInputDiv}>
                                        <TextField
                                            size='small'
                                            label={t("from")}
                                            style={{ width: '47%' }}
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    // color: 'white',
                                                    bgcolor: '#fafafa',
                                                    borderRadius: '4px'
                                                },
                                            }}
                                        />
                                        <TextField
                                            size='small'
                                            label={t("to")}
                                            style={{ width: '47%' }}
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    // color: 'white',
                                                    bgcolor: '#fafafa',
                                                    borderRadius: '4px'
                                                },
                                            }}
                                        />
                                    </div>
                                    <p className={styles.inputsTitle}>{t("Brand")}</p>
                                    <div className={styles.checkboxDiv}>
                                        {
                                            brandList && brandList.map((brand) => {
                                                return (
                                                    <div key={brand.id} className={styles.sideCheckboxDiv}>
                                                        <Checkbox
                                                            sx={{
                                                                color: pink[800],
                                                                '&.Mui-checked': {
                                                                    color: pink[600],
                                                                },
                                                            }}
                                                            checked={selectedBrands.includes(brand.id)}
                                                            onChange={() => handleBrandToggle(brand.id)}
                                                        />
                                                        <p style={{ fontWeight: 500, fontSize: '14px' }}>{brand.name}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    <p className={styles.inputsTitle}>
                                        {
                                            categoryId == 1 ||
                                                categoryId == 9 ||
                                                categoryId == 10 ?
                                                t('Built-in memory capacity') :
                                                categoryId == 3 ||
                                                    categoryId == 4 ||
                                                    categoryId == 5 ||
                                                    categoryId == 6 ||
                                                    categoryId == 12 ?
                                                    t('Color')
                                                    :
                                                    t('Material')
                                        }</p>
                                    {
                                        categoryId == 1 ||
                                            categoryId == 9 ||
                                            categoryId == 10 ?
                                            <div className={styles.checkboxDiv}>
                                                {
                                                    memoryCapacity.map((item) => {
                                                        return (
                                                            <div key={item.id} className={styles.sideCheckboxDiv}>
                                                                <Checkbox
                                                                    sx={{
                                                                        color: pink[800],
                                                                        '&.Mui-checked': {
                                                                            color: pink[600],
                                                                        },
                                                                    }}
                                                                    checked={selectedMemoryCapacities.includes(item.value)}
                                                                    onChange={() => handleMemoryCapacityToggle(item.value)}
                                                                />
                                                                <p style={{ fontWeight: 500, fontSize: '14px' }}>{item.value}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            :
                                            categoryId == 3 ||
                                                categoryId == 4 ||
                                                categoryId == 5 ||
                                                categoryId == 6 ||
                                                categoryId == 12 ?
                                                <div className={styles.checkboxDiv}>
                                                    {
                                                        colors.map((item) => {
                                                            return (
                                                                <div key={item.id} className={styles.sideCheckboxDiv}>
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: pink[800],
                                                                            '&.Mui-checked': {
                                                                                color: pink[600],
                                                                            },
                                                                        }}
                                                                        checked={selectedColors.includes(item.name)}
                                                                        onChange={() => handleColorToggle(item.name)}
                                                                    />
                                                                    <p style={{ fontWeight: 500, fontSize: '14px' }}>{t(item.name)}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                :
                                                <div className={styles.checkboxDiv}>
                                                    {
                                                        materials.map((item) => {
                                                            return (
                                                                <div key={item.id} className={styles.sideCheckboxDiv}>
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: pink[800],
                                                                            '&.Mui-checked': {
                                                                                color: pink[600],
                                                                            },
                                                                        }}
                                                                        checked={selectedMaterials.includes(item.name)}
                                                                        onChange={() => handleMaterialToggle(item.name)}
                                                                    />
                                                                    <p style={{ fontWeight: 500, fontSize: '14px' }}>{t(item.name)}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>

                                    }

                                </div>
                            </div>
                            {/* </div> */}
                            <div className={styles.productsContainer}>
                                {
                                    loading ?
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-300px' }}>
                                        <CircularWithValueLabel />
                                    </div>
                                    :
                                    filteredProducts && filteredProducts.map((product) => {
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

                    </div>
                </div>
            }
        </>

    )
}

export default ProductsByCategory
