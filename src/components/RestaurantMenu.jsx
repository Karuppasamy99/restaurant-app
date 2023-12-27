import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCartItems, removeCartItems } from '../utils/cartSlice'
import { Link } from 'react-router-dom'
import  { MenuShimmer } from './Shimmer'
import ErrorElement from './ErrorElement'
import ScrollToTop from './TopScreen'

const RestaurantMenu = () => {
    const [restaurantMenu, setRestaurantMenu] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getRestaurantMenu()
    },[])

    const getRestaurantMenu = async() => {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5270362&lng=77.13593279999999&restaurantId=${id}`)
        const data = await response.json();
        setRestaurantMenu(data)
    }

    const restaurant = restaurantMenu?.data?.cards

    const restaurantItems = restaurantMenu?.data

    console.log('Cards',restaurantMenu?.data?.cards)

   
    
    let result = [],
    uniqueFoodItems = [];

  const customFilter = (object, result) => {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty("itemCards")) result.push(object);

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        customFilter(object[Object.keys(object)[i]], result);
      }
    }
  };
  restaurant?.length > 0 && customFilter(restaurant, result)

  console.log('result', result)

  if (result.length > 0) {
    const uniqueIds = [];
    let uniqueItems = [
      ...new Set(result.flatMap((f) => f.itemCards).map((p) => p.card.info)),
    ];

    console.log('uniqueItems', uniqueItems)
    uniqueFoodItems = uniqueItems?.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);

      if (!isDuplicate) {
        uniqueIds.push(element.id);

        return true;
      }

      return false;
    });
  }

  console.log('uniquefood', uniqueFoodItems)

  const dispatch = useDispatch();

  const cartItems = useSelector( state => state.cart.items)

  const addFoodItem = (item) => {
    dispatch(addCartItems(item))
  }

  const removeFoodItem = (item) =>{
    dispatch(removeCartItems(item))
  }

  if(!restaurant) return <MenuShimmer />

  return !restaurantMenu? <ErrorElement /> : (
      <div>
        <ScrollToTop />
          <div className="grid justify-center m-auto p-4 md:max-w-[70%] lg:max-w-[70%]">
            <div className="grid lg:grid-cols-2 gap-12 border-dotted border-b-2 p-2 sm:grid-cols-none ">
              <div className="text-center">
                <h1 className="font-bold p-2">
                  {restaurantItems && restaurantItems?.cards[0]?.card?.card?.info?.name}
                </h1>
                <ul>
                  <li className="p-2 font-small text-sm text-slate-500 font-sans">
                    {restaurantItems?.cards[0]?.card?.card?.info?.cuisines.join(", ")}
                  </li>
                  <li className="p-2 font-small text-sm text-slate-500 font-sans">
                    {restaurantItems?.cards[0]?.card?.card?.info?.areaName},{" "}
                    {
                      restaurantItems?.cards[0]?.card?.card?.info?.sla
                        ?.lastMileTravelString
                    }
                  </li>
                  <li className="p-2 font-small text-sm  font-sans text-green-700">
                    {restaurantItems?.cards[0]?.card?.card?.info?.avgRating} &#9733; ||
                    <span className="p-2  flexfont-bold  font-small text-sm text-slate-500 font-sans">
                      {restaurantItems?.cards[0]?.card?.card?.info?.totalRatingsString}
                    </span>
                  </li>
                </ul>
              </div>
  
              <div className="rounded-lg sm:h-full  sm:rounded-md flex justify-center">
                <img className='sm:w-96 md:w-60 lg:w-60'
                  src={
                    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
                    restaurantItems?.cards[0]?.card?.card?.info?.cloudinaryImageId
                  }
                  alt={restaurantItems?.cards[0]?.card?.card?.info?.name}
                />
              </div>
            </div>
  
            <div className="">
              <h1 className="font-bold border-b pt-2 pb-2 m-auto">Menu</h1>
              <ul>
                {uniqueFoodItems.length > 0 ? (
                  Object.values(uniqueFoodItems).map((item, index) => {
                    if (index < 25) {
                      return (
                        <li
                          className="grid lg:grid-cols-8 justify-center p-2 gap-2 m-2 border-b sm:grid-cols-4"
                          key={index}
                        >
                          <>
                            <div className="lg:col-span-5">
                              <span className="font-bold">{item?.name}</span>
                              <br />
                              <span>
                                ₹ {(item?.price || item?.defaultPrice) / 100}
                              </span>
                              <br />
                              <span className="font-small mt-2 text-sm text-slate-500 font-sans hidden md:block">
                                {item?.description}
                              </span>
                            </div>
                            <div className="relative justify-self-end col-span-3">
                              {item?.imageId && (
                                <img
                                  className="sm:w-96 sm:h-96 md:w-[118px] md:h-[118px] lg:w-[118px] lg:h-[118px] rounded-md  object-cover"
                                  src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + item?.imageId}
                                  alt="item"
                                />
                              )}
                              <div className="text-center w-[118]  mt-1 border-2 rounded-md">
                                <button
                                  className="text-gray-800 font-extrabold px-3"
                                  onClick={() => {
                                    removeFoodItem();
                                  }}
                                >
                                  -
                                </button>
                                <button
                                  className="text-green-800 font-bold px-2 m-1 text-sm border-x-2 align-middle"
                                  disabled={true}
                                >
                                  {
                                    cartItems.filter((f) => f.id === item.id)
                                      .length
                                  }
                                </button>
                                <button
                                  className="text-green-800 font-extrabold px-3"
                                  onClick={() => {
                                    addFoodItem(item);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </>
                        </li>
                      );
                    }
                  })
                ) : (
                  <span>No restaurant menu items.</span>
                )}
              </ul>
            </div>
  
            {cartItems?.length > 0 && (
              <div className="flex justify-between fixed bottom-9 right-3 mb-12 mr-10">
                <span className="px-5 py-2 text-sm font-bold tracking-wide text-white rounded-full focus:outline-none"></span>
                <Link to="/cart">
                  {" "}
                  <button className="px-5 py-2 text-sm font-bold tracking-wide text-white bg-orange-500 rounded-full">
                    <i className="fa fa-shopping-cart"></i> Cart -{" "}
                    {cartItems.length}
                  </button>{" "}
                </Link>
              </div>
            )}
          </div>
          </div>
        )}
  
      



export default RestaurantMenu