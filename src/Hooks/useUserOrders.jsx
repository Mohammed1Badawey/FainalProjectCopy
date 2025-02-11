import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useUserOrders() {
  async function getUserOrders() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/6796bf044e3f2254d6a00dbb`
    );
    console.log(response);
    
    return  (response.data );
  }

  return useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
    staleTime: Infinity,
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: true,
    select: (data) => data || [],
  });
}
