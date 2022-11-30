import img from "../../assets/imgs/1.png";
export default function Slider() {
  return (
    <div className="min-h-[300px] bg-[#1A9687] md:flex md:flex-row-reverse text-white justify-between rounded-md">
      <div className="">
        <img src={img} alt="" className="w-full h-full " />
      </div>
      <div className="flex flex-col justify-center gap-2 p-4 text-center md:text-left">
        <h1 className="font-bold text-2xl md:text-4xl">Sell Your Won Phone</h1>
        <h1 className="font-bold text-2xl md:text-4xl">at Best Price</h1>
        <h1 className="font-bold text-lg md:text-xl">
          Free Pickup | Instant Cash Back
        </h1>
      </div>
    </div>
  );
}
