import React, { useState } from "react";
import { AiFillStar, AiFillSetting } from "react-icons/ai";

function Layout({ children }: { children: React.ReactNode }) {
  const [selectedButton, setSelectedButton] = useState<string>("Trending");

  return (
    <div className="bg-white min-h-screen w-full max-w-full mx-auto relative">
      <div className="overflow-y-auto pb-32">{children}</div>

      <div className="w-full bg-slate-300 text-white p-4 flex justify-around items-center fixed bottom-0 left-0">
        <ButtonNavigate
          title="Trending"
          icon={<AiFillStar className="text-4xl" />}
          isSelected={selectedButton === "Trending"}
          onClick={() => setSelectedButton("Trending")}
        />
        <ButtonNavigate
          title="Setting"
          icon={<AiFillSetting className="text-4xl" />}
          isSelected={selectedButton === "Setting"}
          onClick={() => setSelectedButton("Setting")}
        />
      </div>
    </div>
  );
}

export default Layout;

interface ButtonNavigateProps {
  title: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const ButtonNavigate = ({
  title,
  icon,
  isSelected,
  onClick,
}: ButtonNavigateProps) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center py-2 font-semibold text-center 
        ${isSelected ? "text-blue-500" : "text-gray-700"}`}
      onClick={onClick}
    >
      {icon}
      <span className="mt-1 text-xs">{title}</span>
    </div>
  );
};
