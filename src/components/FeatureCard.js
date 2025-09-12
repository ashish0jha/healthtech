import React from "react";

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm">{desc}</p>
    </div>
  );
};

export default FeatureCard;
