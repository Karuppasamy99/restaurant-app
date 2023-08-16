import { IMG_URL } from "../constants"

const RestaurantCard = ({name, cuisines, cloudinaryImageId, avgRating, locality, costForTwo, areaName}) => {
    console.log(cuisines)
  return (
    <div className=" h-max w-80 shadow-xl p-2 mt-2 m-4 bg-purple-50 transition duration-500 ease-in-out hover:scale-105 hover:shadow-slate-400">
            <img className="sm:p-3" src={`${IMG_URL}${cloudinaryImageId}`} />
            <h3 className="font-bold my-2">{name}</h3>
            <div className="flex flex-wrap">
            <h4 className="">{cuisines?.map((cuisine,i) => <span key={i}>{i<4?`${cuisine+' '}`: ''}</span>)}</h4>
            </div>
            <h3 className="">{areaName}</h3>
            <div className="flex flex-row">
            
                <h4 className=""> &#9733; {avgRating}</h4>
                <h4 className="mx-2">• {locality}</h4>
                <h4>• {costForTwo}</h4>
            
            </div>
        </div>
  )
}

export default RestaurantCard