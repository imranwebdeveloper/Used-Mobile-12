import React, { useContext, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../contexts/AuthContextProvider";
import Section from "../layouts/Section";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/common/Spinner";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Slider from "../components/common/Slider";
import Additional from "../components/common/Additional";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useTitle("Home");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      headers: {
        authorization: `bearer ${localStorage.getItem("usedMobileToken")}`,
      },
    };
    fetch("https://server-imranwebdeveloper.vercel.app/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUser(data.user);
        }
      })
      .catch((err) => console.log(err.message));
  }, [setUser]);

  const { data, isLoading } = useFetch(
    "https://server-imranwebdeveloper.vercel.app/products/advertise"
  );

  return (
    <>
      <Section>
        <Slider />
      </Section>

      <div className="p-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data.products.length > 0 && (
              <h1 className="text-xl font-bold">Advertisement </h1>
            )}
            <div className="mt-2 grid lg:grid-cols-2 gap-4">
              {data &&
                data.products.map((item) => {
                  return (
                    <div
                      className="md:flex justify-between  gap-4 shadow border cursor-pointer hover:shadow-md"
                      key={item._id}
                      onClick={() => navigate("/working")}
                    >
                      <div className="  max-w-[180px]   flex items-center justify-center px-2 ">
                        <img
                          src={item.imgUrl}
                          alt=""
                          className=" max-h-[160px] w-full"
                        />
                      </div>
                      <div className="flex-1 flex flex-col py-4">
                        <div className="flex-1">
                          <h2 className="font-bold text-xl">
                            {item.brand} {item.model} - {item.editions}
                          </h2>
                          <p className="font-bold">
                            Sell Price: {item.price} tk
                          </p>
                          <p>Used : {item.usedOfYear} </p>
                        </div>
                        <div className=" py-2">
                          <p>
                            Post : {new Date(item.postDate).toLocaleString()}
                          </p>
                          <p className="font-bold">
                            Seller :
                            <span className="text-blue-700">
                              {item.isVerified && <WorkspacePremiumIcon />}
                            </span>{" "}
                            {item.UserName}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      <Additional />
    </>
  );
};

export default Home;
