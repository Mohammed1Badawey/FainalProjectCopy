import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 mt-10 border-t border-gray-200">
      <div className=" px-12 mx-auto ">
        
        {/* Section: App Download */}
        <div className=" mb-8 px-12">
          <h2 className="text-2xl font-semibold mb-2">Get the FreshCart app</h2>
          <p className="text-gray-600 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>


          <div className="flex justify-around items-center  ">
            <input 
              type="email" 
              placeholder="Email .." 
              className=" w-3/4  border border-gray-300 px-6 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 text-white px-6 py-1.5 rounded-md hover:bg-green-600">
              Share App Link
            </button>
          </div>
        </div>

        {/* Section: Payment Partners and App Stores */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          
          {/* Payment Partners */}
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">Payment Partners</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Amazon_Pay_logo.svg" alt="Amazon Pay" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/American_Express_logo_%282018%29.svg" alt="American Express" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
          </div>

          {/* App Store Links */}
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <span className="text-lg font-medium">Get deliveries with FreshCart</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
          </div>

        </div>
      </div>
    </footer>
  );
};





        {/* <nav className="bg-emerald-500 py-5 fixed inset-x-0 bottom-0 text-center text-white font-bold">
          Footer
        </nav> */}
