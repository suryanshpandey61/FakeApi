import React, { useEffect, useState } from "react";

function Shop() {
  // Loading state
  const [loader, setLoader] = useState(false);

  // State for all products
  const [allProducts, setAllProducts] = useState([]);

  // State for categories
  const [category, setCategory] = useState([]);

  // Filtered data state
  const [filteredData, setFilterData] = useState([]);

  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cart state initialized from local storage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Fetch all products on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoader(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setAllProducts(data);
        setFilterData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Fetch all categories on mount
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const categories = await response.json();
        setCategory(["All Products", ...categories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategory();
  }, []);

  // Category filter handler
  const categoryHandler = (category) => {
    setSelectedCategory(category);

    if (category === "All Products") {
      setFilterData(allProducts);
    } else {
      const filtered = allProducts.filter(item => item.category === category);
      setFilterData(filtered);
    }
  };

  // Add to cart handler
  const cartHandler = (item) => {
    // Create a copy of the cart
    const updatedCart = [...cart, item];
    
    // Update the cart state
    setCart(updatedCart);
    
    // Update local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="flex shop-div">
      {/* Category sidebar */}
      <div className="w-[200px] mt-8">
        <p className="text-black text-2xl font-bold">Category</p>

        {loader ? (
          <div></div>
        ) : (
          category.map((item, index) => (
            <div
              className="text-xl mt-1 font-semibold gap-y-8 capitalize hover:cursor-pointer border border-slate-700"
              onClick={() => categoryHandler(item)}
              key={index}
            >
              {item}
            </div>
          ))
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-3 w-full space-x-5 mx-auto mb-5">
        {loader ? (
          <div className="loader  mt-[200px] ml-[400px]"></div>
        ) : (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="w-[250px] hover:scale-[1.07] hover:shadow-lg shadow-black transition-all duration-500 space-y-6 p-4 mx-auto mt-8 rounded-md border border-black bg-white"
            >
              <p className="text-xl font-bold">{item.title}</p>
              <img src={item.image} className="h-[200px] mx-auto" alt={item.title} />
              <p className="text-sm text-slate-500">
                {item.description.substring(0, 100)}...
              </p>
              <div className="flex justify-between">
                <p className="text-green-600 font-medium">${item.price}</p>
                <button
                  onClick={() => cartHandler(item)}
                  className="border border-black rounded-md px-6 py-2 hover:text-white hover:bg-black transition-all duration-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Shop;
