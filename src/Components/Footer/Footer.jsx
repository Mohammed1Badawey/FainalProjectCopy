import React from "react";
import amazonLogo from "../../assets/Payment_Methods/amazon_card_cash_icon.svg";
import americanExpressLogo from "../../assets/Payment_Methods/amex-svgrepo-com.svg";
import mastercardLogo from "../../assets/Payment_Methods/mastercard_payment_icon.svg";
import paypalLogo from "../../assets/Payment_Methods/payment_paypal_icon.svg";
import appStore from "../../assets/Payment_Methods/download-on-the-app-store.svg";
import googlePlay from "../../assets/Payment_Methods/google-play-badge.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-5 pb-12 px-6 border-t border-gray-200/60 mx-auto">
      <div className="allFooter">
        <div className="md:px-12 border-b-2 border-gray-300 EmailPart">
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
              className=" md:w-3/4 w-full  border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 w-fit ms-auto text-white px-6 py-0.5 rounded-md hover:bg-green-600">
              Share App Link
            </button>
          </div>
        </div>

        <div className="PaymentPart gird grid-cols-12 text-gray-600 border-b-2 border-gray-300">
          <div className="grid grid-cols-12">
            <div className="lg:flex lg:items-center grid grid-cols-12 lg:col-span-4 justify-items-center col-span-12 mx-auto gap-3">
              <h6 className="col-span-12 text-center w-fit mx-auto pt-2 text-sm md:text-lg font-light">
                Payment Partners
              </h6>

              <div className="col-span-12 grid grid-cols-12 justify-items-center gap-2">
                <figure className="col-span-3">
                  <img src={amazonLogo} alt="Amazon Pay" className="h-10" />
                </figure>

                <figure className="col-span-3">
                  <img
                    src={americanExpressLogo}
                    alt="American Express"
                    className="h-10"
                  />
                </figure>

                <figure className="col-span-3">
                  <img src={mastercardLogo} alt="Mastercard" className="h-10" />
                </figure>

                <figure className="col-span-3">
                  <img src={paypalLogo} alt="PayPal" className="h-10" />
                </figure>
              </div>
            </div>

            <div className="lg:flex lg:items-center col-span-12 lg:col-span-5 lg:col-start-8 justify-items-center">
              <h6 className="text-lg font-medium pe-1">
                Get deliveries with FreshCart
              </h6>

              <div className="flex">
                {" "}
                <figure className="px-1">
                  <img src={googlePlay} alt="Google Play" className="h-30" />
                </figure>
                <figure className="px-1">
                  <img src={appStore} alt="App Store" className="h-30" />
                </figure>
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
