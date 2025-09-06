import React from "react";
import { useSelector } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

export default function SideBarLinks({ links }) {
  //console.log("links ", links);
  const location = useLocation();
  const Icon = Icons[links.icon];
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="relative   ">
      {
        <NavLink to={links.path} className={`w-full`}>
          <div
            className={`${matchRoute(links.path) ? "bg-yellow-600" : ""} p-1.5`}
          >
            <div className="flex gap-3 items-center">
              <span>
                <Icon />
              </span>
              {links.name}
            </div>
          </div>

          <div className={`${matchRoute(links.path)?"opacity-100":"opacity-0"} w-0.5 h-full bg-yellow-25 absolute top-0`}></div>
        </NavLink>
        
      }
    </div>
  );
}
