import React, { useContext, useEffect, useState } from "react";
import Section from "../layouts/Section";
import { useLocation } from "react-router-dom";
import BasicModal from "../components/common/Modal";
import Spinner from "../components/common/Spinner";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { AuthContext } from "../contexts/AuthContextProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);
  const [booked, setBooked] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://server-imranwebdeveloper.vercel.app/product/${location.state.brand}`
      )
      .then((data) => {
        if (data.data.status) {
          setData(data.data.product);
        }
        setLoading(false);
      });
  }, [location]);

  const handleWishlist = (item) => {
    if (!user) {
      return toast.error("Please Login First");
    }
    const brandName = `${item.brand} ${item.model} ${item.editions}`;
    const img = item.imgUrl;
    const price = item.price;
    const email = user.email;
    const userId = user._id;
    const productId = item._id;
    const bookInfo = {
      email,
      userId,
      img,
      brandName,
      price,
      productId,
    };

    fetch(`https://server-imranwebdeveloper.vercel.app/add-wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Added successfully, Please Check Wishlist");
          handleClose();
        } else {
          toast.error("You have Already Wishlist this product");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleBooked = (item) => {
    if (user) {
      setBooked(item);
      handleOpen();
    } else {
      toast.error("Please Login First");
    }
  };

  return (
    <Section>
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl font-bold ">{location.state.brand}</h1>

        {loading ? (
          <Spinner />
        ) : (
          data.map((item) => {
            return (
              <div
                className="md:flex justify-between  gap-4 shadow border"
                key={item._id}
              >
                <div className="  max-w-[180px]  mx-auto flex items-center justify-center p-2 ">
                  <img
                    src={item.imgUrl}
                    alt=""
                    className=" max-h-[160px] mx-auto"
                  />
                </div>
                <div className="flex-1 flex flex-col py-4">
                  <div className="flex-1">
                    <h2 className="font-bold text-xl">
                      {item.brand} {item.model} - {item.editions}
                    </h2>
                  </div>
                  <div className=" py-2">
                    <div className="flex gap-4">
                      <p className="font-bold">Original Price : 45000</p> ||
                      <p className="font-bold">Sell Price: {item.price} tk</p>
                    </div>
                    <p className="py-2">{item.descriptions}</p>
                    <p>Used : {item.usedOfYear} </p>

                    <p> Post : {new Date(item.postDate).toLocaleString()}</p>
                    <p>Location : {item.locations}</p>
                    <p className="font-bold">
                      Seller :
                      <span className="text-blue-700">
                        {item.isVerified && <WorkspacePremiumIcon />}
                      </span>
                      {item.UserName}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 ">
                    <button
                      className="px-8 py-1 bg-blue-700 text-white font-bold  "
                      onClick={() => handleBooked(item)}
                    >
                      Book Now
                    </button>
                    <button
                      className="px-8 py-1 border-2 border-blue-600 text-blue-700 font-bold  "
                      onClick={() => handleWishlist(item)}
                    >
                      Add Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
        {user && (
          <BasicModal open={open} handleClose={handleClose} data={booked} />
        )}
      </div>
    </Section>
  );
};

export default Products;
