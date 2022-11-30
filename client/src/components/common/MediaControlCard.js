import * as React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MediaControlCard({ item }) {
  const navigate = useNavigate();
  return (
    <div className="grid  grid-cols-5 shadow-md  gap-2 mb-4">
      <div className="h-32 col-span-1">
        <img src={item.img} alt="Album" className="rounded-l h-full" />
      </div>
      <div className="col-span-4 gap-4  flex items-center p-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{item.brandName}</h1>
          <h3>Price : {item.price}</h3>
        </div>

        {item.isSold ? (
          <Button
            variant="contained"
            color="success"
            sx={{ paddingX: "2rem" }}
            disabled
          >
            Paid
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            sx={{ paddingX: "2rem" }}
            onClick={() => navigate(`/pay/${item.productId}`)}
          >
            Pay
          </Button>
        )}
      </div>
    </div>
  );
}
