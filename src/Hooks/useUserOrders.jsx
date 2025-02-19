import { useQuery } from "@tanstack/react-query";
import { authAxios, publicAxios } from "../../API/AxiosConfig";
import { useContext, useEffect } from "react";
import { JwtContext } from "../Context/JwtContext";

export default function useUserOrders() {

  const { userId } = useContext(JwtContext);

  async function checkToken() {
    const response = await authAxios.get(`/auth/verifyToken`);
    return response.data.decoded.id;
  }

  async function getUserOrders() {
    const response = await publicAxios.get(`/orders/user/${userId}`);
    return response.data;
  }

  useEffect(() => {
    getUserOrders();
  }, [userId]);

  const ordersQuery = useQuery({
    queryKey: ["userOrders", userId],
    queryFn: () => getUserOrders(),
    enabled: !!userId,
    staleTime: Infinity,
    retry: 3,
    retryDelay: 2000,
  });

  return ordersQuery;
}
