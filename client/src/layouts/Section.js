import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Spinner from "../components/common/Spinner";

const Section = ({ children }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://server-imranwebdeveloper.vercel.app/products").then(
        (res) => res.json()
      ),
  });
  if (isLoading) {
    return <Spinner />;
  }
  const catagories = [...new Set(data.map((item) => item.brand))];
  return (
    <div className=" grid lg:grid-cols-[300px_1fr] mt-8 gap-4">
      <div className="border flex flex-col border">
        <h1 className="text-xl font-bold p-4">Categories</h1>
        {catagories.map((item, i) => {
          return (
            <Link
              to={`/category/${item.toLowerCase()}`}
              key={i}
              className="p-4 flex justify-between  mx-4 rounded hover:bg-slate-100 font-bold "
              state={{ brand: item }}
            >
              <p>{item}</p>
              <span>
                <ArrowForwardIosIcon />
              </span>
            </Link>
          );
        })}
      </div>
      <div className="border">{children}</div>
    </div>
  );
};

export default Section;
