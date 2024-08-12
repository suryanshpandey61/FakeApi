import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function AddNewData() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {  
    try {
      const fetchCategory = await fetch("https://fakestoreapi.com/products/categories");
      const updatedCategory = await fetchCategory.json();
      setCategory(updatedCategory);
      if (updatedCategory.length > 0) {
        setSelectedCategory(updatedCategory[0]); // Set default selected category
      }
    } catch (err) {
      console.log("Error while fetching categories", err);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!productName|| !productDesc||!productImage||!productPrice|| !selectedCategory){
      toast.error ("Enter the data");
      return;
    }

    const newProduct = {
      title: productName,
      price: parseFloat(productPrice),
      description: productDesc,
      image: productImage,
      category: selectedCategory,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      console.log("Product added successfully", data);

      toast.success("Product added successfully");
     

      // Reset form
      setProductName("");
      setProductDesc("");
      setProductImage("");
      setProductPrice("");
      setSelectedCategory(category.length > 0 ? category[0] : "");
    } catch (err) {
      console.log("Error while posting data", err);
      toast.error("Error while adding product");
    }
  };

  return (
    <div className="w-[600px] ml-[340px] ">
      <h1 className="text-2xl font-bold text-center mt-6">Add New Data Here</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center mt-7 gap-y-6 border border-purple-500 p-4 rounded-xl"
      >
        {/* Product Name */}
        <div>
          <label htmlFor="product-name">
            Product Name:
            <input
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              name="product-name"
              type="text"
              placeholder="Enter Product Name"
              className="border border-black rounded-md ml-6"
            />
          </label>
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="product-desc">
            Product Desc:
            <input
              onChange={(e) => setProductDesc(e.target.value)}
              value={productDesc}
              name="product-desc"
              type="text"
              placeholder="Enter Product Description"
              className="border border-black rounded-md ml-7"
            />
          </label>
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="product-price">
            Product Price:
            <input
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              name="product-price"
              type="number"
              placeholder="Enter Product Price"
              className="border border-black rounded-md ml-7"
            />
          </label>
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="product-image">
            Product Image:
            <input
              onChange={(e) => setProductImage(e.target.value)}
              value={productImage}
              name="product-image"
              type="url"
              placeholder="Enter Product Image URL"
              className="border border-black rounded-md ml-5"
            />
          </label>
        </div>

        {/* Category */}
        <div className="flex ml-[130px] mt-4">
          <p>Enter Category:</p>
          <select
            className="outline rounded-md ml-4"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {category.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          className="border border-black hover:bg-green-500 hover:text-white transition-all duration-500 w-[200px] ml-[200px] rounded-lg px-4 py-2 font-bold"
          type="submit"
        >
          Post Data
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddNewData;
