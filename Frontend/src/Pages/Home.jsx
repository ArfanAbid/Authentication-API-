import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { HiArrowCircleUp } from "react-icons/hi";
import { FiSlack } from "react-icons/fi";

const Home = () => {
  return (
    <div className="mb-10">
      <div className="text-4xl font-bold flex justify-center p-2 mb-10">
        Smart Customer Support System
      </div>
      <div className="text-2xl font-bold flex justify-center p-2 mb-10">
        From idea to product
        <FiSlack size={26} className="self-center mx-3" />
      </div>
      <div className="flex justify-center">
        <Textarea placeholder="Type your message here." />{" "}
        <HiArrowCircleUp size={35} className="self-center mx-1" />
      </div>
    </div>
  );
};

export default Home;
