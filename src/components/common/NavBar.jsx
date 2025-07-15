import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getAllCategory from "../../services/operations/categoryApi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";

function NavBar() {
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
    //console.log(token);
    //console.log(user);
    
    
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategory(response.data.data);
      } catch (error) {
        console.log("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b border-richblack-700 bg-richblack-900 text-richblack-25">
      <div className="w-11/12 max-w-maxContent flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-x-6 text-sm font-medium">
            {NavbarLinks.map((el, index) => (
              <li key={index}>
                {el.title === "Catalog" ? (
                  <div className="relative group cursor-pointer flex items-center gap-1">
                    <p>{el.title}</p>
                    <IoIosArrowDropdownCircle className="text-lg" />

                    {/* Dropdown */}
                    <div className="absolute left-1/2 top-full z-20 mt-2 w-[300px] -translate-x-1/2 rounded-md bg-richblack-5 text-richblack-900 p-4 shadow-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
                      {/* Arrow */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 h-4 w-4 bg-richblack-5"></div>

                      {category.length > 0 ? (
                        category.map((el, index) => (
                          <Link
                            key={index}
                            to={`/catalog/${el.name}`}
                            className="block px-3 py-2 hover:bg-richblack-100 rounded text-center"
                          >
                            {el.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center text-sm">Loading...</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={el.path}>
                    <p
                      className={`hover:text-yellow-25 transition ${
                        matchRoute(el.path) ? "text-yellow-25" : ""
                      }`}
                    >
                      {el.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link>
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            
        </div>
      </div>
    </div>
  );
}

export default NavBar;
