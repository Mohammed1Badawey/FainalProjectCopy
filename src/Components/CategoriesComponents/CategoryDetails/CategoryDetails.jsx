import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CategoryDetails() {
  const { categoryId } = useParams();

  async function getCategory() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    );
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(),
    staleTime: 30000,
    retry: 5,
    retryDelay: 3000,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
    select: (data) => data.data.data,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-emerald-700">
        Subcategories {}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((sub) => (
          <div
            key={sub._id}
            className="rounded-lg border border-gray-200 p-4 text-center shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">{sub.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
