import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {

  let navigate = useNavigate()

  async function submitData(registerObj) {
    console.log(registerObj);
    let {data} = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      registerObj
    );
    if (data.massage == "success") {
      navigate("/")
    }else{
      
    }
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min Length is 3")
      .max(10, "Max Length is 10")
      .required("Name is required"),

    email: yup.string().email("Invalid Email").required("Email is required"),

    password: yup
      .string()
      .min(6, "Min Length is 6")
      .required("Password is required"),

    rePassword: yup
      .string()
      .required("RePassword Is Required")
      .oneOf([yup.ref("password")], "Not Matched With Password"),

    phone: yup
      .string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "Please Enter Egyption Number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto px-8">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.name} Change a few things up and try submitting
              again.
            </div>
          ) : null}
        </div>

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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your RePassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.rePassword} Change a few things up and try
              submitting again.
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.phone} Change a few things up and try submitting
              again.
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 m-auto
          focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-sm block mx-auto  px-5 py-2.5 text-center "
        >
          Register
        </button>
      </form>
    </>
  );
}
