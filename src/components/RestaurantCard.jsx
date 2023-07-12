import { IMG_URL } from "../constants"

const RestaurantCard = ({name, cuisines, cloudinaryImageId, avgRating, lastMileTravelString, costForTwoString, area}) => {
    
  return (
    <div className="h-max w-80 shadow-xl justify-center rounded-lg m-5 transition duration-500 ease-in-out p-2 hover:scale-105 hover:bg-slate-400">
            <img src={`${IMG_URL}${cloudinaryImageId}`} />
            <h3 className="font-bold my-2">{name}</h3>
            <h4>{cuisines?.join(',')}</h4>
            <h3>{area}</h3>
            <div className="flex flex-row">
            
                <h4> &#9733; {avgRating}</h4>
                <h4 className="mx-4">• {lastMileTravelString}</h4>
                <h4>• {costForTwoString}</h4>
            
            </div>
        </div>
  )
}

export default RestaurantCard