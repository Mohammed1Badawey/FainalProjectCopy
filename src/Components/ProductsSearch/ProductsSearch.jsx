import React, { useEffect, useState } from "react";

export default function ProductsSearch({ setSearchQuery }) {
  const [searchText, setSearchText] = useState("");

  function onChangeSearch(e) {
    e.preventDefault();
    setSearchQuery(searchText);
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setSearchQuery(searchText);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchText]);

  return (
    <>
      <form onSubmit={onChangeSearch} className="mx-auto w-full max-w-xl grow">
        <input
          onChange={onChangeSearch}
          type="search"
          value={searchText}
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 text-sm text-gray-900 outline-none focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="Search Laptop, PS5..."
          required
        />
      </form>
    </>
  );
}
