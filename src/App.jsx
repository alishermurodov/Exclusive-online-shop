
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Wishlist from './pages/Wishlist/Wishlist'
import Cart from './pages/Cart/Cart'
import VisitProduct from './pages/visitProduct/VisitProduct'
import Checkout from './pages/Checkout/Checkout'
import ProductsByCategory from './pages/productsByCategory/ProductsByCategory'
import NotFound from './pages/NotFound/NotFound'

function App() {
  console.log();
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "wishlist",
          element: <Wishlist />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "visitProduct/:productId",
          element: <VisitProduct />
        },
        {
          path: "checkout",
          element: <Checkout />
        },
        {
          path: "products/:categoryId",
          element: <ProductsByCategory />
        },
        {
          path: "*",
          element: <NotFound />
        },
      ]
    }
  ])

  return (
    
      <RouterProvider router={router} />
      
    
  )
}

export default App
