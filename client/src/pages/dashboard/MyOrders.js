import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import MediaControlCard from "../../components/common/MediaControlCard";
import Spinner from "../../components/common/Spinner";
import { AuthContext } from "../../contexts/AuthContextProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await fetch(
        `https://server-imranwebdeveloper.vercel.app/my-orders/${user._id}`
      );
      const myOrders = await res.json();
      const data = myOrders.booked;
      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen mt-8">
      {!data ? (
        <h1 className="text-center text-2xl">You hove no Order List</h1>
      ) : (
        <Typography
          variant="h4"
          fontWeight={"bold"}
          align="center"
          mb={2}
          gutterBottom
        >
          ALL Orders List
        </Typography>
      )}
      <div className="max-w-[600px] mx-auto">
        {data &&
          data.map((item, i) => {
            return <MediaControlCard key={i} item={item} />;
          })}
      </div>
    </div>
  );
};

export default MyOrders;
