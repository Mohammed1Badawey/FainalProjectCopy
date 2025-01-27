import React from "react";
import amazonLogo from "../../assets/Payment_Methods/amazon_card_cash_icon.svg";
import americanExpressLogo from "../../assets/Payment_Methods/amex-svgrepo-com.svg";
import mastercardLogo from "../../assets/Payment_Methods/mastercard_payment_icon.svg";
import paypalLogo from "../../assets/Payment_Methods/payment_paypal_icon.svg";
import appStore from "../../assets/Payment_Methods/download-on-the-app-store.svg";
import googlePlay from "../../assets/Payment_Methods/google-play-badge.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-5 px-6 border-t border-gray-200/60 mx-auto">
      <div className="">
        <div className="md:px-12 border-b-2 border-gray-300">
          <div className="flex flex-col">
            <h2 className="text-xl font-normal md:ps-0.5">
              Get the FreshCart app
            </h2>
            <p className="text-gray-600 text-justify">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>

          <div className="flex flex-col gap-y-2 md:flex-row md:justify-around md:items-center py-5  ">
            <input
              type="email"
              placeholder="Email .."
              className=" md:w-3/4 w-full  border border-gray-300 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 w-fit mx-auto text-white px-6 py-1.5 rounded-md hover:bg-green-600">
              Share App Link
            </button>
          </div>
        </div>

        <div className="justify-center items-center flex flex-col md:flex-row md:justify-between md:items-center text-gray-600 border-b-2 border-gray-300">
          <div className="grid grid-cols-5 gap-1">
            <h5 className="col-span-5 md:col-span-1 text-center pt-2 md:pe-1 self-center text-sm md:text-lg font-light">
              Payment Partners
            </h5>

            <div className="grid grid-cols-4 md:grid-cols-4 mx-auto col-span-4 md:flex gap-3">
              <figure className="col-span-1">
                <img src={amazonLogo} alt="Amazon Pay" className="h-10" />
              </figure>
              <figure className="col-span-1">
                <img
                  src={americanExpressLogo}
                  alt="American Express"
                  className="h-10"
                />
              </figure>
              <figure className="col-span-1">
                <img src={mastercardLogo} alt="Mastercard" className="h-10" />
              </figure>
              <figure className="col-span-1">
                <img src={paypalLogo} alt="PayPal" className="h-10" />
              </figure>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
            <span className="text-lg font-medium">
              Get deliveries with FreshCart
            </span>

            <div className="flex">
              {" "}
              <div className="px-1">
                <img src={googlePlay} alt="Google Play" className="h-30" />
              </div>
              <div className="px-1">
                <img src={appStore} alt="App Store" className="h-30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

{
  /* <nav className="bg-emerald-500 py-5 fixed inset-x-0 bottom-0 text-center text-white font-bold">
          Footer
        </nav> */
}
