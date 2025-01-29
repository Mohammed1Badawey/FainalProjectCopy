import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  function setErrorNull() {
    setApiError("");
  }

  async function submitData(loginObj) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, loginObj)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message) {
        }
        setErrorNull();
        localStorage.setItem("userToken", res.data.token);
        navigate("/");
      })
      .catch((res) => {
        setApiError(res.response.data.message);
        setIsLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),

    password: yup
      .string()
      .min(6, "Min Length is 6")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-2xl mx-auto px-8 py-2"
      >


        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.email} Change a few things up and try submitting
              again.
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.password} Change a few things up and try submitting
              again.
            </div>
          ) : null}
        </div>


        {ApiError && (
          <div className="p-2 mt-2 text-center  text-black text-md font-semibold w-1/2 mx-auto border-2 border-red-600  rounded-md">
            {ApiError}
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 m-auto
          focus:outline-none my-2 focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-sm block mx-auto  px-5 py-2.5 text-center "
        >
          {IsLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
        <div className="mx-auto">
          <h6 className="text-center">
          New to FrechCart?{" "}
            <Link to={"/register"}>
              {" "}
              <span className="underline font-semibold">Register</span>{" "}
              now
            </Link>
          </h6>
        </div>
      </form>
    </>
  );
}

//  && formik.values.phone.trim() !== ""
