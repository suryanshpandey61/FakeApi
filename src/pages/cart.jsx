import React from "react";
import { useEffect, useState } from "react";

function Cart() {
  const [cartItem, setCartItem] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const removeItem = (index) => {
    const updatedItems = cartItem.filter((_, i) => i !== index);
    setCartItem(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };
  //totall amount in the cart 
  const totalAmount = cartItem.reduce((acc,item)=> acc+item.price,0);

  //total items in the cart
  const totalItems = cartItem.length;

  console.log(cartItem);

  return (
    
      <div className="flex  justify-evenly mx-auto">

        {/* left side wala jha cartitems show ho rh  */}
        <div className=" ">
          {cartItem.map((item, index) => (
            <div
              key={index}
              className="
                 
                   space-y-6 flex  p-4 mx-auto mt-8 rounded-md"
            > 
              {/* image tag  */}
              <img src={item.image} className="h-[200px] mx-auto  " />

              {/* rhs side product desc and detail amount  */}
            <div className="w-[500px] ml-3 gap-y-2"> 
               <p className="text-xl font-bold"> {item.title}</p>
              
              <p className="text-sm text-slate-500 mt-1">
                {item.description.substring(0, 100)}...
              </p>
             
                <p className="text-green-600 font-medium mt-1">${item.price}</p>
                <button
                  className="border
                  hover:bg-red-600 hover:text-white transition-all duration-500
                  border-black rounded-md px-6 py-2  mt-2 text-red-700"
                  onClick={() => removeItem(index)}
                >
                  Remove Item
                </button>
             <div className="w-[700px] h-[1px] bg-black mt-[60px] ml-[-190px]" ></div>
            </div>
            
              
            </div>
          ))}
        
        </div>

        {/* right side overall money count */}
        <div className="mt-[100px]">
            <h1 className="text-xl text-green-500">Your Cart</h1>

            <h1 className="text-3xl font-bold text-green-500 mt-[20px]">Summary</h1>  

            <div className="flex "> 
              <h1 className="font-bold text-xl mt-5">Total Items : {totalItems}  </h1>
             
            </div>

            <div className="flex "> 
              <h1 className="font-bold text-xl mt-5">Total Amount $: {totalAmount}  </h1>
             
            </div>


        </div>
      </div>
    
  );
}

export default Cart;
