import React from "react";
import { AiFillStar, AiFillSetting } from "react-icons/ai";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen max-w-xs">
      <div className="">{children}</div>

      {/* Bottom Navigation */}
      <div className="w-full bg-slate-300 text-white p-4 flex justify-around items-center">
        <ButtonNavigate
          title="Trending"
          icon={<AiFillStar className="text-xl" />}
          path="/trending"
        />
        <ButtonNavigate
          title="Setting"
          icon={<AiFillSetting className="text-xl" />}
          path="/search"
        />
      </div>
    </div>
  );
}

export default Layout;

const ButtonNavigate = ({
  title,
  icon,
  path,
}: {
  title: string;
  icon: React.ReactNode;
  path: string;
}) => {
  return (
    <button
      className="w-full flex flex-col items-center justify-center py-2 font-semibold text-center text-gray-700"
      onClick={() => (window.location.href = path)}
    >
      {icon}
      <span className="mt-1 text-xs">{title}</span>
    </button>
  );
};
