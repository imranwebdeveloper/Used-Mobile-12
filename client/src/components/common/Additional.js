import React from "react";
import { GiBlackHoleBolas, GiRecycle, GiAutoRepair } from "react-icons/gi";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { FaPeopleCarry, FaLaravel } from "react-icons/fa";

const Additional = () => {
  return (
    <div className="p-2">
      <h1 className="text-2xl text-center md:text-left">Additional Service</h1>
      <div className="flex flex-wrap md:justify-between justify-center gap-4">
        <div className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer">
          <GiBlackHoleBolas className="text-8xl mb-1" />
          <p className="font-bold">Black Friday</p>
        </div>
        <div className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer">
          <GiRecycle className="text-8xl mb-1" />
          <p className="font-bold">Recycle Phone</p>
        </div>
        <div className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer">
          <MdOutlinePhonelinkSetup className="text-8xl mb-1" />
          <p className="font-bold">Refurbished Phones</p>
        </div>
        <div className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer">
          <GiAutoRepair className="text-8xl mb-1" />
          <p className="font-bold">Repair Phones</p>
        </div>
        <div className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer">
          <FaPeopleCarry className="text-8xl mb-1" />
          <p className="font-bold">Visit Our Store</p>
        </div>
        <div className="border rounded-md p-4 min-w-[170px] text-center mt-4 flex flex-col items-center shadow cursor-pointer">
          <FaLaravel className="text-8xl mb-1" />
          <p className="font-bold">Buy Accessories </p>
        </div>
      </div>
    </div>
  );
};

export default Additional;
