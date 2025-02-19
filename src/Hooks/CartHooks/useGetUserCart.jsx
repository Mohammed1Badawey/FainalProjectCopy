import { useQuery } from "@tanstack/react-query";
import { authAxios } from "../../../API/AxiosConfig";

const getUserCart = async () => {
  const res = await authAxios.get(`/cart`);
  return res.data;
};

const useGetUserCart = () => {
  const ifUser = localStorage.getItem("userToken");
  const query = useQuery({
    queryFn: () => getUserCart(),
    queryKey: ["cartItems"],
    staleTime: 0.5 * (1000 * 60),
    select: (cartData) => cartData,
    enabled: !!ifUser,
  });
  return query;
};

export default useGetUserCart;
