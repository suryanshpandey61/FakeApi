import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import AddNewData from '../component/AddNewData';
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';


export default function Admin() {

  const [allData,setAllData] = useState([]);

  const notify = () => toast("Item deleted Successfully");

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
    },
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Price',
      selector: row =>`$${ row.price}`, 
    },
    {
      name: 'Category',
      selector: row => row.category,
    },
    {
      name: 'Image',
      selector: row => (
        <img src={row.image} alt={row.title} className='h-auto w-[50px]' />
      )
    }
    ,
    {
      name: 'Delete',
      cell: row => (
      <button className='text-red-600 font-bold' onClick={notify}>Delete</button>
    ),
    },
    
  ]; 


  const getData = async () => {
    try{
      const response = await fetch ("https://fakestoreapi.com/products");
      const result = await response.json();
      setAllData(result);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getData();
  },[])



  return (
    <div className='outline w-[1200px] rounded-md mb-10  mx-auto p-6 mt-9'>
      <h1 className='text-4xl text-center mb-5 underline mt-3 '>All Product Details </h1>
  
     <Link to="/addnewdata">
      <button className='border rounded-md px-4 py-2 text-sm border-purple-700 font-semibold'>Add new Data <b className='text-xl'>+</b> </button>
       
     </Link>

      <DataTable data={allData}
      columns={columns}
      
      />
      <ToastContainer />
    </div>
  )
}
