import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { NavLink } from "react-router-dom";

export default function MyProfile () {
  const { userToken, setuserToken } = useContext(authContext);

  return (

<div> 
  <button className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
    Account 
    <i class="fa-solid fa-angle-down ps-2"></i>
  </button>

  <div id="dropdownInformation" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
    
    <div className="px-4 py-3 text-sm text-gray-900">
      <div>Mohammed</div>
    </div>

    {userToken && (
                  <>
                  <ul>
                    <li>
                      <NavLink to="/myprofile">MyProfile</NavLink>
                    </li>
                    <li>
                      <span
                        className="cursor-pointer"
                        to=""
                      >
                        Logout
                      </span>
                    </li>
                    </ul>
                  </>
    )
  }

    <div className="py-2">
      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
    </div>

  </div>
</div>
);
};

