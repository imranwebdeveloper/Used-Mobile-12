import React from "react";
import { GiBlackHoleBolas, GiRecycle, GiAutoRepair } from "react-icons/gi";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { FaPeopleCarry, FaLaravel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Additional = () => {
  const navigate = useNavigate();
  return (
    <div className="px-2 py-8">
      <h1 className="text-xl font-bold text-center md:text-left">
        Additional Service
      </h1>
      <div className="flex flex-wrap md:justify-between justify-center gap-4">
        <div
          className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/working")}
        >
          <GiBlackHoleBolas className="text-8xl mb-1" />
          <p className="font-bold">Black Friday</p>
        </div>
        <div
          className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/working")}
        >
          <GiRecycle className="text-8xl mb-1" />
          <p className="font-bold">Recycle Phone</p>
        </div>
        <div
          className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/working")}
        >
          <MdOutlinePhonelinkSetup className="text-8xl mb-1" />
          <p className="font-bold">Refurbished Phones</p>
        </div>
        <div
          className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/working")}
        >
          <GiAutoRepair className="text-8xl mb-1" />
          <p className="font-bold">Repair Phones</p>
        </div>
        <div
          className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/working")}
        >
          <FaPeopleCarry className="text-8xl mb-1" />
          <p className="font-bold">Visit Our Store</p>
        </div>
        <div
          className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/working")}
        >
          <FaLaravel className="text-8xl mb-1" />
          <p className="font-bold">Buy Accessories </p>
        </div>
      </div>
    </div>
  );
};

export default Additional;
