import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"


const Header = () => {
  const cartItems = useSelector(state => state.cart.items)
  return (
    <>
    <div className="flex  bg-orange-300 w-full h-25 p-2 justify-between sm:w-full">
        
    <img className="h-20" src="https://tse4.mm.bing.net/th?id=OIP.50r-WoPGd_apeFIizSG_KAHaF7&pid=Api&P=0&w=300&h=300" alt="Hotel logo" />
    <nav>
        <ul className="flex">
            <li className="p-2 my-4"><Link to={'/'}>Home</Link></li>
            <li className="p-2 my-4"><Link to={'/about'}>About</Link></li>
            <li className="p-2 my-4"><Link to={'/contact'}>Contact</Link></li>
        </ul>
    </nav>
    <button className="mx-2">Cart - {cartItems.length}</button>
    </div>
    <Outlet />
    </>
  )
}

export default Header