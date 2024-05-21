import React, { useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import axios from "axios";

const Products = () => {
  // const { all_product } = useContext(ShopContext);
  const [all_product, setall_product] = useState();

  const getProducts = async () => {
    try {
      const data = await axios.get(
        "https://shemanages.onrender.com/products/getProducts"
      );
      setall_product(data.data);
      console.log("jkd ");

      console.log(all_product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-white md:max-w-screen-xl sm:max-w-screen-lg max-w-screen-md items-center justify-center mx-auto sm:px-10 p-4 h-full  md:mb-10 sm:mb-10 mb-12 min-h-full ">
      {/* <img src={props.banner} alt="banner image" /> */}
      <div className="flex justify-between items-center p-4">
        {/* <p>
          <span>Showing 1-12</span> out of 36 products
        </p> */}
        <div className="rounded-full p-1 px-4 text-sm  flex border-2 border-black items-center justify-center hover:scale-110 duration-500 hover:bg-black hover:text-white cursor-pointer">
          Sort by{" "}
          <IoMdArrowDropdownCircle className="m-auto w-7 h-7 pl-1 text-center" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {all_product?.map((item, i) => (
          <Item
            key={i}
            username={item.username}
            userId={item.userId}
            profile={item.profile}
            _id={item._id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
