
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Body from './components/body'
import RestaurantMenu from './components/RestaurantMenu'
import Footer from './components/Footer'
import { Provider } from 'react-redux'
import store from './utils/store'
import ErrorElement from './components/ErrorElement'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Body />,
        errorElement: <ErrorElement />
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantMenu />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/cart',
        element: <Cart />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/contact',
        element: <Contact />,
        errorElement: <ErrorElement />,
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <ErrorElement />,
      },

    ]
  },
  
])

function App() {
  

  return (
    <Provider store={store}>
    <>
    <RouterProvider router={appRouter} />
    <Footer />
    </>
    </Provider>
  )
}

export default App
