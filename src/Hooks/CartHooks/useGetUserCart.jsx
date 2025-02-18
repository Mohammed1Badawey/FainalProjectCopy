import { useQuery } from "@tanstack/react-query";
import { authAxios } from "../../../API/AxiosConfig";

const getUserCart = async () => {
  const res = await authAxios.get(`/cart`);
  return res.data;
};

const useGetUserCart = () => {
  const query = useQuery({
    queryFn: () => getUserCart(),
    queryKey: ["cartItems"],
    staleTime: 0.5 * (1000 * 60),
    select: (cartData) => cartData?.data,
  });
  return query;
};

export default useGetUserCart;
