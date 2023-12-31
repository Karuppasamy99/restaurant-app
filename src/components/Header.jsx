import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"


const Header = () => {
  const cartItems = useSelector(state => state.cart.items)
  return (
    <>
    <div className="flex  bg-orange-300 w-full h-25 p-2 justify-between sm:w-full">
        
    <Link to={'/'}><img className="h-20" src="https://tse4.mm.bing.net/th?id=OIP.erjW__Xah_CKv7J5WPne6QHaHA&pid=Api&P=0&h=180" alt="Hotel logo" /></Link> 
    <nav>
        <ul className="flex">
            <li className="p-2 my-4 underline"><Link to={'/'}>Home</Link></li>
            <li className="p-2 my-4 underline"><Link to={'/about'}>About</Link></li>
            <li className="p-2 my-4 underline"><Link to={'/contact'}>Contact</Link></li>
        </ul>
    </nav>
    <Link to={'/cart'}><button className="my-6 mx-2">Cart - {cartItems.length}</button></Link>
    </div>
    <Outlet />
    </>
  )
}

export default Header