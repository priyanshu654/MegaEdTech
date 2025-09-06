import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideBarLinks from "./SideBarLinks";
import { useDispatch, useSelector } from "react-redux";
import { VscSettingsGear } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authApi";
import ConfermationModal from "../../common/ConfermationModal";

export default function SideBar() {
  //console.log(sidebarLinks);
  const { user } = useSelector((state) => state.profile);
  const [modalData,setModalData]=useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  return (
    <div className="min-w-[220px] bg-richblack-800 h-screen border-r-richblack-500 border-x py-10">
      <div className="w-full flex flex-col gap-0.5 text-pure-greys-25 ">
        {sidebarLinks.map((links) => {
          if (links.type && links.type !== user.accountType) return null;
          return <SideBarLinks links={links} key={links.id} />;
        })}
      </div>
      <div className="mt-5 w-full h-[1px] bg-richblack-700"></div>
      <div className="text-pure-greys-25 flex flex-col mt-5 p-2 gap-2">
        <Link to={"/dashboard/settings"}>
          <button>
            <div className="flex items-center gap-5">
              <VscSettingsGear size={20}/>
              Setting
            </div>
          </button>
        </Link>
        <button onClick={()=>{
          setModalData({
            text1:"Are you sure?",
            text2:"You will be logged out from your account",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btn1Handler:()=>dispatch(logout(navigate)),
            btn2Handler:()=>setModalData(null)
          })
        }}>
          <div className="flex items-center gap-5">
            <VscSignOut size={20}/>
            Logout
          </div>
        </button>
      </div>
      {modalData&&(
        <ConfermationModal modalData={modalData}/>
      )}
    </div>
  );
}
