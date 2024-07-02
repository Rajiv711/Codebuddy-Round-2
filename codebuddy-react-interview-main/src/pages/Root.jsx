import {  Outlet } from "react-router-dom";


const Root = () => {
  return (
    <div className="min-h-[100dvh] bg-slate-200 py-7 text-black">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;