import React from "react";

export default function LoadingAndErrorHandler({ isLoading, isError, error, children }) {
  if (isError) {
    return (
      <h3 className="my-12 text-center text-2xl font-bold text-red-600">
        {error?.message || "Something went wrong!"}
      </h3>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-18 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return children;
}

