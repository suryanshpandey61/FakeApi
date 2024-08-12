import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState  } from 'react'
import { HiShoppingCart } from "react-icons/hi2";


function Navbar() {

  const [cartItem, setCartItem] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const totalItems = cartItem.length;


  return (
    <div className='w-full flex  p-4 bg-slate-900'>

      <Link to='/' className='ml-[150px]'>
        <img src={logo} className='h-[50px] w-[50px]'/>
      </Link> 

<div className=' flex gap-x-[30px] ml-[500px] '>
  
      <div> 
        <Link to="/" className='text-4xl text-slate-300 font-bold hover:underline transition-all duration-500'>
         Shop
        </Link>
      </div>

     

      <div>  
        <Link to="/admin" className='text-4xl hover:underline transition-all duration-500 text-slate-300 font-bold'>
          Admin
        </Link>
     </div>

     <div>
        <Link to="/cart" className='text-4xl flex relative text-slate-300 hover:underline transition-all duration-500 font-bold'>
         Cart <HiShoppingCart className='text-2xl mt-3 ml-1' />
        {
          totalItems>0 && (
            <span className='absolute  text-red-600 text-[25px] top-[-10px] left-[90px]' >{totalItems}</span>
          )
        }
        
        </Link>
      </div>
</div>
     


    </div>
  )
}

export default Navbar