/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useState } from "react"
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const body = () => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [filterRestaurantData, setFilterRestaurantData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [itemsNotFound, setItemsNotFound] = useState('');
    
    useEffect(()=>{
        getRestaurantData();
    },[])

    async function getRestaurantData(){
        try{
          const response = await fetch('https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=8.701930899999999&lng=77.72807829999999&page_type=DESKTOP_WEB_LISTING');
          const data = await response.json();
          setRestaurantData(data.data.cards[3].card.card.gridElements?.infoWithStyle?.restaurants);
          setFilterRestaurantData(data.data.cards[3].card.card.gridElements?.infoWithStyle?.restaurants);
          console.log('get data',data.data.cards[3].card.card.gridElements?.infoWithStyle?.restaurants);
          
          // console.log('get data',data?.cards);
        }
        catch(err){
                console.log(err);
              }
        
      }
    console.log(searchData)

    const searchRestaurantData = (searchData, restaurantData) => {
      const searchRestaurant = restaurantData?.filter( restaurantData => restaurantData?.info?.name?.toLowerCase().includes(searchData?.toLowerCase()))
      if(searchRestaurant.length === 0){
        setItemsNotFound(`Sorry, We couldn't find any restaurant with name '${searchData}`)
      }
      setFilterRestaurantData(searchRestaurant)
      console.log('list restaurant',searchRestaurant)
      }
      if(!restaurantData) return null
    
  return restaurantData.length ===0? <Shimmer /> : (
    <>
    <div className="h-12 flex flex-row justify-center bg-orange-200 w-full">
    <input className="m-2 px-3 h-8 rounded-lg sm:w-1/2 lg:w-1/6" value={searchData} onChange={(e)=> {setSearchData(e.target.value), searchRestaurantData(e.target.value,restaurantData)}} type="text" />
    <button className="px-4 m-2 bg-orange-400 rounded-lg" onClick={()=> searchRestaurantData(searchData, restaurantData)}>Search</button>
    </div>
    <div className="flex flex-wrap justify-center overflow-hidden">
        {filterRestaurantData.length ===0? <p className="m-5 p-5 font-bold">{itemsNotFound}</p> : filterRestaurantData && filterRestaurantData?.map( restaurant =>  <Link to={`restaurant/${restaurant.info.id}`} key={restaurant.info.id}><RestaurantCard  {...restaurant.info} /></Link>)}
    </div>
    </>
  )
}

export default body