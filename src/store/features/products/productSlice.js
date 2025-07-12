import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { json } from "react-router-dom"

// const ApiProducts = 'http://localhost:3000/products'
// const ApiSubcategories = 'http://localhost:3000/subCategories'
// const ApiBrands = 'http://localhost:3000/brands'

const ApiProducts = '/products.json'
const ApiSubcategories = '/subCategories.json'
const ApiBrands = '/brands.json'


//cartList from localstorage
const items = localStorage.getItem('cartList') != null ? JSON.parse(localStorage.getItem('cartList')) : []

//recentList from localstorage
const itemsRecent = localStorage.getItem('recentList') != null ? JSON.parse(localStorage.getItem('recentList')) : []

//cartListCounter from localstorage
const totalCounterCart = localStorage.getItem('cartListCounter') != null ? JSON.parse(localStorage.getItem('cartListCounter')) : 0

//wishList from localstorage
const wishlistItems = localStorage.getItem('wishList') != null ? JSON.parse
    (localStorage.getItem('wishList')) : []

//wishListCounter from localstorage
const totalCounterWishlist = localStorage.getItem('wishListCounter') != null ? JSON.parse(localStorage.getItem('wishListCounter')) : 0

const initialState = {
    productList: [],
    subcategoriesList: [],
    brandsList: [],
    // cartList: items,
    cartList: items.map(item => ({ ...item, quantity: 1 })),
    cartListCounter: totalCounterCart,
    recentList: itemsRecent,
    wishList: wishlistItems,
    wishListCounter: totalCounterWishlist,
    isLoading: false,
    selectedProduct: null,
    cartTotal: 0,
}


//getProducts
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        try {
            const response = await fetch(ApiProducts)
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('error: ', error);
        }
    }
)

// getSubcategories 
export const getSubcategories = createAsyncThunk(
    "products/getSubcategories",
    async () => {
        try {
            const response = await fetch(ApiSubcategories)
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('error: ', error);
        }
    }
)

//getProductByID
// export const getProductByID = createAsyncThunk(
//     "products/getProductByID",
//     async (id) => {
//         try {
//             const response = await fetch(`${ApiProducts}/${id}`)
//             const responseData = await response.json()
//             return responseData
//         } catch (error) {
//             console.error('error: ', error);
//         }
//     }
// )
export const getProductByID = createAsyncThunk(
    "products/getProductByID",
    async (id) => {
        try {
            const response = await fetch('/products.json');
            const data = await response.json();
            const foundProduct = data.find(product => product.id === Number(id));
            return foundProduct;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
        }
    }
);


//getBrands
export const getBrands = createAsyncThunk(
    "products/getBrands",
    async () => {
        try {
            const response = await fetch(ApiBrands)
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('error: ', error);
        }
    }
)



export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedProduct: (state, { payload }) => {
            state.selectedProduct = payload
        },
        setCartList: (state, { payload }) => {

            const existingProductIndex = state.cartList.findIndex(item =>
                item.id === payload.id
            );

            if (existingProductIndex !== -1) {
                state.cartList[existingProductIndex].quantity += 1;
            } else {
                state.cartList.push({ ...payload, quantity: 1 });
            }

            localStorage.setItem('cartList', JSON.stringify(state.cartList.map(item => item)))
            //recentList 
            const existItemIndex = state.recentList.findIndex(item => item.id === payload.id);

            if (existItemIndex !== -1) {
                state.recentList[existItemIndex] = payload;
            } else {
                state.recentList.push(payload);
            }
            localStorage.setItem('recentList', JSON.stringify(state.recentList.map(item => item)))
        },
        pushAllWishToCart: (state) => {
            state.wishList.map((wishElem) => {
                let isInCart = false
                state.cartList.map(cartElem => {
                    if (wishElem.id === cartElem.id) {
                        isInCart = true
                    }
                })
                if (!isInCart) {
                    state.cartList.push(wishElem)
                }
            });
            localStorage.setItem('cartList', JSON.stringify(state.cartList.map(item => item)))

            // update cartListCounter 
            state.cartListCounter = state.cartList.length;
            localStorage.setItem('cartListCounter', JSON.stringify(state.cartListCounter))

        },
        setCartListCounter: (state) => {
            state.cartListCounter = state.cartList.length;
            localStorage.setItem('cartListCounter', JSON.stringify(state.cartListCounter))
        },
        deleteFfromCart: (state, { payload }) => {

            state.cartList = state.cartList.filter((e) => {
                return e.id !== payload.id
            })
            state.cartListCounter = state.cartList.length

            localStorage.setItem('cartList', JSON.stringify(state.cartList.map(item => item)))
            localStorage.setItem('cartListCounter', JSON.stringify(state.cartListCounter))
        },
        setRecentList: (state, { payload }) => {
            state.cartList.map((cartElem) => {
                let isInCart = false
                state.recentList.map(recentElem => {
                    if (cartElem.id === recentElem.id) {
                        isInCart = true
                    }
                })
                if (!isInCart) {
                    state.recentList.push(cartElem)
                }
            });
            localStorage.setItem('recentList', JSON.stringify(state.recentList.map(item => item)))
        },
        setWishList: (state, { payload }) => {
            state.wishList.push(payload)
            localStorage.setItem('wishList', JSON.stringify(state.wishList.map((elem) => elem)));

        },
        setWishlistCounter: (state) => {
            state.wishListCounter = state.wishList.length
            localStorage.setItem('wishListCounter', JSON.stringify(state.wishListCounter))
        },
        deleteFromWishlist: (state, { payload }) => {
            state.wishList = state.wishList.filter((elem) => elem.id !== payload.id)

            state.wishListCounter = state.wishList.length

            localStorage.setItem('wishList', JSON.stringify(state.wishList.map(elem => elem)))

            localStorage.setItem('wishListCounter', JSON.stringify(state.wishListCounter))
        },
        setQuantity: (state, { payload }) => {
            const { productId, quantity } = payload;
            const productIndex = state.cartList.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                state.cartList[productIndex].quantity = quantity;
                state.cartTotal = state.cartList.reduce((sum, item) => {
                    return sum + (item.quantity * item.price)
                }, 0)
            }
        },
        setCartTotal: (state, action) => {
            state.cartTotal = action.payload;
        },

    },
    extraReducers: (builder) => {
        // getProducts
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        });
        // getProductByID
        builder.addCase(getProductByID.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getProductByID.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedProduct = action.payload
        });
        builder.addCase(getProductByID.rejected, (state) => {
            state.isLoading = false;
        });
        // getSubcategories
        builder.addCase(getSubcategories.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getSubcategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.subcategoriesList = action.payload
        });
        builder.addCase(getSubcategories.rejected, (state) => {
            state.isLoading = false;
        });
        // getSubcategories
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brandsList = action.payload
        });
        builder.addCase(getBrands.rejected, (state) => {
            state.isLoading = false;
        });
    },
})

export const {
    setSelectedProduct,
    setCartList,
    setCartListCounter,
    deleteFfromCart,
    setWishList,
    setWishlistCounter,
    deleteFromWishlist,
    pushAllWishToCart,
    setQuantity,
    setCartTotal
} = productSlice.actions

