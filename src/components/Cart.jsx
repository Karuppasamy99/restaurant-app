import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { clearCartItems } from "../utils/cartSlice";


function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  let uniqueFoodItems = [];
  if (cartItems.length > 0) {
    let uniqueItems = [...new Set(cartItems)];
    uniqueFoodItems = uniqueItems.map((value) => [
      value,
      cartItems.filter((str) => str === value).length,
    ]);
  }
  const total =
    cartItems.length > 0
      ? cartItems
          .map((x) => (x.price > 0 ? x.price / 100 : x.defaultPrice / 100))
          .reduce((sum, a) => sum + a, 0)
      : 0;

  const final = total + 49 + 29;

  const handleClearCart = () => {
    dispatch(clearCartItems());
  };
  const placeOrder = () => {
    dispatch(clearCartItems());
    setOpenModal(true);
  };

  return (
    <>
    <div>
      {cartItems?.length > 0 && (
        <div className="mt-4 text-center text-lg font-bold">
          <h3 className="fw-bolder">Cart Items- {cartItems.length}</h3>
        </div>
      )}

      {cartItems?.length == 0 && (
        <div className="mt-4  text-center">
          <h1 className="font-bold text-2xl">Cart Empty</h1>
          <h2 className="mt-2 font-semibold text-2xl">
            You can go to{" "}
            <a href="/" className="font-bold">
              Home Page
            </a>{" "}
            to view more restaurants.
          </h2>
        </div>
      )}
      <div className="grid place-items-center">
        <div className="pt-4">
          <div className="">
            {Object.values(uniqueFoodItems).map((item, index) => {
              return (
                <div key={index}>
                  <li type="none" >
                    <div className="flex flex-col">
                      <div className=" justify-center">
                        <h3 className="font-bold">
                          {item[0].name} - [{item[1]}]
                        </h3>
                        <p className="">
                          ₹ {(item[0]?.price || item[0]?.defaultPrice) / 100}
                        </p>
                        <p className="item-desc hidden md:block ">
                          {item[0]?.description}
                        </p>
                      </div>
                      <div className="">
                        {item[0]?.imageId && (
                          <img
                            className="sm:w-72 rounded-md h-[96] object-cover md:w-96 lg:w-96 lg:p-4 lg:rounded-lg"
                            src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + item[0]?.imageId}
                            alt="item"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          {" "}
          <div className="grid place-items-center">
            <div className="">
              <div className="">
                <h1 className="text-center font-semibold ">Price Breakup</h1>
                <hr />
                <div className="">
                  <div className="items-start text-start mt-2 mb-2 ">
                    <div className="">
                      <label>Item Total </label>
                      {`₹${total}`}
                    </div>
                    <label>Taxes ₹49</label>
                    <div>
                      <label>Delivery Charges ₹29</label>
                    </div>
                  </div>
                  <hr />
                  <div className="font-bold mt-2">Total Amount :- ₹{final}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        [null]
      )}

      {cartItems?.length > 0 && (
        <div className="grid">
          <button
            className="p-2 mt-2 col-span-1 justify-self-center hover:bg-green-100 bg-green-400 rounded-md"
            onClick={() => {
              handleClearCart();
            }}
            disabled={!cartItems.length}
          >
            Clear Cart
          </button>
          <button
            className="col-span-1 justify-self-center border rounded-lg m-2 bg-orange-200 p-2"
            onClick={() => {
              placeOrder();
            }}
            disabled={!cartItems.length}
          >
            Place Order
          </button>
        </div>
      )}
      {openModal && <Modal closeModal={setOpenModal} />}
      </div>
    </>
  );
}

export default Cart;
